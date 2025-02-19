import express, {Express, Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import winston from "winston"
import Logger from "./config/logger.config.js";
import router from "./api/routes.js";
import { checkDatabaseConnection } from "@palash/db-client";
import "./adapters/redis.adapter.js";

checkDatabaseConnection();

const app: Express = express();
const loggerInstance = new Logger();
const logger: winston.Logger | undefined = loggerInstance.getLogger();


app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
dotenv.config();


// init Router
app.use('/api/v1', router);

app.get('/health', (req: Request, res: Response) => {
   res.status(200).json({ status: 'OK' });
});

export default app;
