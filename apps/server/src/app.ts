import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import winston from "winston"
import Logger from "./config/logger.config.js";
import router from "./api/routes.js";
import { checkDatabaseConnection } from "@palash/db-client";
import "./adapters/redis.adapter.js";
import { errorHandler, setupUnhandledErrorHandlers } from "./middlewares/errorHandler.js";
import { NotFoundError } from "./utils/errors.js";
import path from "path";
import { __dirname } from "./utils/__dirname-handler.js";

// Setup unhandled error handlers
setupUnhandledErrorHandlers();

// Database connection check
checkDatabaseConnection();

const app: Express = express();
const loggerInstance = new Logger();
const logger: winston.Logger | undefined = loggerInstance.getLogger();


// Pre-route middlewares
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
}));


app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use("/uploads", express.static(path.join(path.join(__dirname, '../'), "uploads")));
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// Routes
app.use('/api/v1', router);

app.get('/api/v1/health', (req: Request, res: Response) => {
   res.status(200).json({ status: 'OK' });
});

// Handle 404 errors
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
});

// Global error handling middleware
app.use(errorHandler);

export default app;
