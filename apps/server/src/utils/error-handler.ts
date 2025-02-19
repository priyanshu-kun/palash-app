import { HttpCodes } from "../@types/types.js";

export default class AppError extends Error {
    public readonly httpCodes: HttpCodes;
    public readonly isOperational: Boolean;

    constructor(message: string, httpCodes: HttpCodes = 500, isOperational = true) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype);
        this.httpCodes = httpCodes;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}