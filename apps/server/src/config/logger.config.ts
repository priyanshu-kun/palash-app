import { info, time } from "console";
import winston from "winston";
const { combine, timestamp, json } = winston.format;
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import "winston-daily-rotate-file"

class Logger {
    private logLevels: winston.config.AbstractConfigSetLevels;
    private __filename: string;
    private __dirname: string;
    private logger: winston.Logger | undefined;
    constructor() {
        this.logLevels = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            debug: 4,
            trace: 5,
        }

        this.__filename = fileURLToPath(import.meta.url);
        this.__dirname = dirname(this.__filename);
        this.logger = this.enableLogging();
    }

    private enableLogging = () => {
        try {
            const errorFilter = winston.format((info, opts) => {
                return info.level === 'error' ? info : false;
            });

            const infoFilter = winston.format((info, opts) => {
                return info.level === 'info' ? info : false;
            });

            const debugFilter = winston.format((info, opts) => {
                return info.level === 'debug' ? info : false;
            });

            const infoFileRotateTransport = new winston.transports.DailyRotateFile({
                filename: `${join(this.__dirname, '../logs/info-%DATE%.log')}`,
                datePattern: 'YYYY-MM-DD',
                maxFiles: '1d',
                zippedArchive: true,
                maxSize: '7mb',
                level: 'info',
                format: combine(infoFilter(), timestamp(), json())
            })


            const errorFileRotateTransport = new winston.transports.DailyRotateFile({
                filename: `${join(this.__dirname, '../logs/error-%DATE%.log')}`,
                datePattern: 'YYYY-MM-DD',
                maxFiles: '1d',
                zippedArchive: true,
                maxSize: '7mb',
                level: 'error',
                format: combine(errorFilter(), timestamp(), json())
            })
            const debugFileRotateTransport = new winston.transports.DailyRotateFile({
                filename: `${join(this.__dirname, '../logs/debug-%DATE%.log')}`,
                datePattern: 'YYYY-MM-DD',
                maxFiles: '1d',
                zippedArchive: true,
                maxSize: '7mb',
                level: 'debug',
                format: combine(debugFilter(), timestamp(), json())
            })

            return winston.createLogger({
                levels: this.logLevels,
                level: process.env.LOG_LEVEL || 'info',
                format: combine(timestamp(), json()),
                transports: [
                    new (winston.transports.Console)(),
                    infoFileRotateTransport,
                    errorFileRotateTransport,
                    debugFileRotateTransport
                ]
            })
        }
        catch (err) {
            console.error("[ERROR] Logger initilization failed: ", err);
            winston.createLogger({
                level: 'error',
                format: combine(timestamp(), json()),   
                transports: [
                    new (winston.transports.Console)()
                ]
            })
        }
    }
    getLogger = () => {
        return this.logger;
    }
}

export default Logger;
