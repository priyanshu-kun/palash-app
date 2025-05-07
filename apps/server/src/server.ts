import app from "./app.js";
import { createServer } from "http";
import { WebSocketServer } from "./adapters/websocket.adapter.js";

const port = process.env.PORT || 8080;

// Create HTTP server
const httpServer = createServer(app);

// Initialize WebSocket server
try {
    const wss = WebSocketServer.getInstance(httpServer);
    console?.info(`[websocket]: WebSocket server instance created`);
    
    wss.onInitialized(() => {
        console.info(`[websocket]: WebSocket server initialized successfully`);
    });
} catch (error) {
    console.error(`[websocket]: Failed to initialize WebSocket server: ${error}`);
    console.error(`[websocket]: Failed to initialize WebSocket server:`, error);
}

// Start server
httpServer.listen(port, () => {
    console.info(`[server]: Server is running at http://localhost:${port}`);
    console.info(`[websocket]: WebSocket server is accepting connections at ws://localhost:${port}`);
});