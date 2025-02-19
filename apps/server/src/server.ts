import app from "./app.js";
import Logger from "./config/logger.config.js";

const loggerInstance = new Logger();
const logger = loggerInstance.getLogger();

const port = process.env.PORT;
app.listen(port, async (err: any) => {
    logger?.info(`[server]: Server is running at http://localhost:${port}`);
})