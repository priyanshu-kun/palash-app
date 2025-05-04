import app from "./app.js";
import Logger from "./config/logger.config.js";
import { createServer } from "http";
import { WebSocketServer } from "./adapters/websocket.adapter.js";

const loggerInstance = new Logger();
const logger = loggerInstance.getLogger();

const port = process.env.PORT || 8080;

// Create HTTP server
const httpServer = createServer(app);

// Initialize WebSocket server
try {
    const wss = WebSocketServer.getInstance(httpServer);
    logger?.info(`[websocket]: WebSocket server instance created`);
    
    wss.onInitialized(() => {
        logger?.info(`[websocket]: WebSocket server initialized successfully`);
    });
} catch (error) {
    logger?.error(`[websocket]: Failed to initialize WebSocket server: ${error}`);
    console.error(`[websocket]: Failed to initialize WebSocket server:`, error);
}

// Start server
httpServer.listen(port, () => {
    logger?.info(`[server]: Server is running at http://localhost:${port}`);
    logger?.info(`[websocket]: WebSocket server is accepting connections at ws://localhost:${port}`);
});