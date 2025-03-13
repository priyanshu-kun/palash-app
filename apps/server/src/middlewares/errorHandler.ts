import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import Logger from '../config/logger.config.js';

const logger = new Logger().getLogger();

interface ErrorResponse {
  status: string;
  message: string;
  stack?: string;
  errors?: any;
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let errorResponse: ErrorResponse = {
    status: 'error',
    message: 'Internal Server Error'
  };

  // Handle AppError instances
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorResponse.message = err.message;
    
    // Only add stack trace for non-operational errors in development
    if (!err.isOperational && process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorResponse.status = 'fail';
    errorResponse.message = 'Validation Error';
    errorResponse.errors = err;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorResponse.message = 'Invalid token. Please log in again.';
  }

  // Handle JWT expiration
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    errorResponse.message = 'Your token has expired. Please log in again.';
  }

  // Log error
  logger?.error({
    message: err.message,
    stack: err.stack,
    statusCode,
    path: req.path,
    method: req.method,
  });

  // Send response
  res.status(statusCode).json(errorResponse);
};

// Catch unhandled rejections and exceptions
export const setupUnhandledErrorHandlers = () => {
  process.on('unhandledRejection', (reason: Error) => {
    logger?.error('Unhandled Rejection:', reason);
    throw reason;
  });

  process.on('uncaughtException', (error: Error) => {
    logger?.error('Uncaught Exception:', error);
    
    // Give the server 1 second to process existing requests before shutting down
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });
}; 