import { WebSocket, WebSocketServer as WSServer } from 'ws';
import { Server } from 'http';

interface WebSocketClient extends WebSocket {
    userId?: string;
    isAlive: boolean;
}

export class WebSocketServer {
    private static instance: WebSocketServer;
    private wss: WSServer | null = null;
    private clients: Map<string, WebSocketClient[]> = new Map();
    private initializedCallback: (() => void) | null = null;
    private pendingMessages: Array<{userId: string, data: any}> = [];
    private isInitialized = false;

    private constructor(server?: Server) {
        if (server) {
            this.initializeWithServer(server);
        } else {
            console.warn('[websocket]: Created without server instance - will queue messages until server is available');
        }
    }

    public static getInstance(server?: Server): WebSocketServer {
        if (!WebSocketServer.instance) {
            WebSocketServer.instance = new WebSocketServer(server);
        } else if (server && !WebSocketServer.instance.isInitialized) {
            // If we already have an instance but it wasn't initialized with a server
            WebSocketServer.instance.initializeWithServer(server);
        }
        return WebSocketServer.instance;
    }

    private initializeWithServer(server: Server) {
        try {
            this.wss = new WSServer({ server });
            this.initialize();
            this.isInitialized = true;
            
            // Process any pending messages
            if (this.pendingMessages.length > 0) {
                console.info(`[websocket]: Processing ${this.pendingMessages.length} pending messages`);
                this.pendingMessages.forEach(msg => {
                    this.sendToUser(msg.userId, msg.data);
                });
                this.pendingMessages = [];
            }
        } catch (error) {
            console.error('[websocket]: Failed to initialize with server:', error);
            console.error('[websocket]: Failed to initialize with server:', error);
        }
    }

    public onInitialized(callback: () => void): void {
        this.initializedCallback = callback;
        // If already initialized, call immediately
        if (this.isInitialized) {
            callback();
        }
    }

    private initialize() {
        if (!this.wss) return;

        this.wss.on('connection', (ws: WebSocket) => {
            const client = ws as WebSocketClient;
            client.isAlive = true;
            console.info(`[websocket]: New client connected`);

            client.on('pong', () => {
                client.isAlive = true;
            });

            client.on('message', (message: string) => {
                try {
                    const data = JSON.parse(message.toString());
                    if (data.type === 'AUTH') {
                        this.handleAuth(client, data.userId);
                    }
                } catch (error) {
                    console.error('[websocket]: Error processing WebSocket message:', error);
                }
            });

            client.on('close', () => {
                this.handleDisconnect(client);
            });

            client.on('error', (error) => {
                console.error(`[websocket]: Client error: ${error}`);
            });
        });

        this.wss.on('error', (error) => {
            console.error(`[websocket]: Server error: ${error}`);
        });

        // Heartbeat to keep connections alive
        setInterval(() => {
            if (!this.wss) return;
            
            this.wss.clients.forEach((client: WebSocket) => {
                const ws = client as WebSocketClient;
                if (!ws.isAlive) {
                    console.debug(`[websocket]: Terminating inactive connection`);
                    return ws.terminate();
                }
                ws.isAlive = false;
                ws.ping();
            });
        }, 30000);

        console.info(`[websocket]: WebSocket initialization complete`);
        if (this.initializedCallback) {
            this.initializedCallback();
        }
    }

    private handleAuth(ws: WebSocketClient, userId: string) {
        ws.userId = userId;
        if (!this.clients.has(userId)) {
            this.clients.set(userId, []);
        }
        this.clients.get(userId)?.push(ws);
        console.info(`[websocket]: Client authenticated: ${userId}`);
    }

    private handleDisconnect(ws: WebSocketClient) {
        if (ws.userId) {
            const userClients = this.clients.get(ws.userId);
            if (userClients) {
                const index = userClients.indexOf(ws);
                if (index > -1) {
                    userClients.splice(index, 1);
                }
                if (userClients.length === 0) {
                    this.clients.delete(ws.userId);
                }
            }
        }
        console.info(`[websocket]: Client disconnected: ${ws.userId || 'unknown'}`);
    }

    public sendToUser(userId: string, data: any) {
        // If not initialized yet, queue the message
        if (!this.isInitialized || !this.wss) {
            this.pendingMessages.push({userId, data});
            console.info(`[websocket]: Queued message for user ${userId} - WebSocket not initialized yet`);
            return;
        }

        const userClients = this.clients.get(userId);
        if (userClients && userClients.length > 0) {
            const message = JSON.stringify(data);
            let sentToAtLeastOne = false;
            
            userClients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                    sentToAtLeastOne = true;
                }
            });
            
            if (sentToAtLeastOne) {
                console.info(`[websocket]: Message sent to user ${userId}`);
            } else {
                console.info(`[websocket]: User ${userId} is not connected with an active socket`);
            }
        } else {
            console.info(`[websocket]: No active connections for user ${userId}`);
        }
    }

    public broadcast(data: any, excludeUserId?: string) {
        if (!this.isInitialized || !this.wss) {
            console.warn('[websocket]: Cannot broadcast - WebSocket not initialized');
            return;
        }
        
        const message = JSON.stringify(data);
        this.wss.clients.forEach((client: WebSocket) => {
            const ws = client as WebSocketClient;
            if (ws.readyState === WebSocket.OPEN && ws.userId !== excludeUserId) {
                ws.send(message);
            }
        });
    }

    public getConnectedUsers(): string[] {
        return Array.from(this.clients.keys());
    }
} 