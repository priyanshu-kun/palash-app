import multer from "multer";
import path, { dirname } from "path";
import { Request, Response, NextFunction } from "express";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { __dirname } from "../utils/__dirname-handler.js";
import winston from "winston";

const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FOLDER_PER_UPLOAD = 30;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const folderName = req.body.name ? path.basename(req.body.name) : "default";
      const serviceStorePath = path.join(__dirname, `../uploads/${folderName}`);
      if(!existsSync(serviceStorePath)) {
        mkdirSync(serviceStorePath, {recursive: true});
      }

      const files = readdirSync(serviceStorePath);
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

      if(imageFiles.length >= MAX_FOLDER_PER_UPLOAD) {
        return cb(new Error("Maximum of 30 images allowed per service"), "");
      }
      console.info(`Saving file to: ${serviceStorePath}`)
      cb(null, serviceStorePath); 
    }
    catch(error) {
      cb(error as Error, "");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (ALLOWED_FORMATS.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid file type. Only JPG, JPEG, and PNG are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
});

const handleUploadErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    let errorMessage = "An error occurred during file upload.";

    if (err.code === "LIMIT_FILE_COUNT") {
      res.status(400).json({ error: "Too many files. You can upload up to 10 images." });
      return;
    }

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        errorMessage = "File too large. Max size is 10MB per image.";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        errorMessage = "Invalid file type. Only JPG, JPEG, and PNG are allowed.";
        break;
    }

     res.status(400).json({ error: errorMessage });
     return;
  }

  if (err) {
     res.status(500).json({ error: "Server error during file upload." });
     return;
  }

  next();
};

export { upload, handleUploadErrors };
