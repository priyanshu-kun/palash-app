import { Request, Response, NextFunction } from "express"
import fs from "fs";
import path from "path";
import { prisma } from "@palash/db-client";
import { RequestBody_Create, RequestBody_Update } from "../../@types/interfaces.js";
import Logger from "../../config/logger.config.js";
import { __dirname } from "../../utils/__dirname-handler.js";
import winston from "winston";
import { deleteServicesRedisKeys } from "../../utils/delete-all-redis-keys.js";


const loggerInstance = new Logger();
const logger: winston.Logger | undefined = loggerInstance.getLogger();


class AdminServiceManagementController {
  static async createService(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { name, description, price }: RequestBody_Create = req.body;

      if (!name || !description || !price) {
        res.status(400).json({ message: "Invalid request data" });
        return;
      }

      const media = req.files ? (req.files as Express.Multer.File[]).map(file => `/uploads/${name}/${file.filename}`) : [];

      await deleteServicesRedisKeys();

      const service = await prisma.service.create({
        data: {
          name,
          media,
          description,
          price: parseFloat(price).toFixed(4),
        },
      });

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 3);

      const workingDays = [1, 2, 3, 4, 5];

      for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        if (workingDays.includes(dt.getDay())) {
          await prisma.availability.create({
            data: {
              serviceId: service.id,
              date: new Date(dt),
              isBookable: true,
            },
          });
        }
      }

      res.status(201).json({
        message: "Service created successfully",
        content: { name, description, media, price },
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateServiceImages(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { serviceId } = req.params;
      const { deleteImages } = req.body;
      const uploadedImages = req.files as Express.Multer.File[];


      if (!serviceId) {
        res.status(400).json({ error: "Service ID is required" });
      }

      const service = await prisma.service.findUnique({ where: { id: serviceId } });

      if (!service) {
        res.status(404).json({ error: "Service not found" });
      }

      const serviceFolder = path.join(__dirname, "../uploads", service.name);
      let updatedMedia = service.media;

      const parsedDeletedImages = JSON.parse(deleteImages);

      if (parsedDeletedImages && Array.isArray(parsedDeletedImages)) {
        for (const img of parsedDeletedImages) {
          const imgPath = path.join(serviceFolder, img);
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        }
        updatedMedia = updatedMedia.filter((img: any) => {
          const splitedData = img.split('/');
          const imgName = splitedData[splitedData.length-1];
          return !parsedDeletedImages.includes(imgName);
        });

      }

      const newImages = uploadedImages.map(file => `/uploads/${service.name}/${file.filename}`);
      updatedMedia = [...updatedMedia, ...newImages].slice(0, 10);

      await prisma.service.update({
        where: { id: serviceId },
        data: { media: updatedMedia },
      });

      await deleteServicesRedisKeys();

      res.status(200).json({ message: "Images updated successfully", media: updatedMedia });
    } catch (err) {
      console.error("Error updating service images:", err);
      next(err);
    }
  }

  static async updateServiceData(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { serviceId } = req.params;
      const { name, description, price } = req.body;

      if (!serviceId) {
        res.status(400).json({ error: "Service ID is required" });
        return;
      }

      const service = await prisma.service.findUnique({ where: { id: serviceId } });

      if (!service) {
        res.status(404).json({ error: "Service not found" });
        return;
      }

      let serviceFolder = path.join(__dirname, "../uploads", service.name);

      if (name && name !== service.name) {
        const newFolderPath = path.join(__dirname, "../uploads", name);
        if (fs.existsSync(serviceFolder)) {
          fs.renameSync(serviceFolder, newFolderPath);
        }
        serviceFolder = newFolderPath;
      }

      const updatedService = await prisma.service.update({
        where: { id: serviceId },
        data: { name, description, price },
      });


      await deleteServicesRedisKeys();

      res.status(200).json({ message: "Service updated successfully", service: updatedService });
    } catch (err) {
      console.error("Error updating service data:", err);
      next(err);
    }
  }
  static async deleteService(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { serviceId }: { serviceId: string } = req.body;

      if (!serviceId) {
        res.status(400).json({ error: "Service ID is required" });
        return;
      }

      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });

      if (!service) {
        res.status(404).json({ error: "Service not found" });
        return;
      }

      const imagePath = path.join(__dirname, "../uploads", service?.name);

      fs.rmSync(imagePath, { recursive: true });

      await prisma.service.delete({
        where: { id: serviceId }
      });

      await deleteServicesRedisKeys();

      res.json({ message: "Service and related images deleted successfully" });
      return;

    } catch (err) {
      console.error("Error deleting service:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }
}


export default AdminServiceManagementController;