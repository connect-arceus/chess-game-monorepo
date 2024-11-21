import WebSocket, { WebSocketServer } from "ws";

import { UserManager, type User } from "./UserManager";
import { GameManager } from "./GameManager";

import { INCOMING_MESSAGE, type INCOMING_MESSAGES } from "./messages/incomingMessages";
import { OUTGOING_MESSAGE } from "./messages/outgoingMessages";

const ws = new WebSocketServer({ port: 8080, host: "127.0.0.1",  });

const userManager = new UserManager();
const gameManager = new GameManager();

ws.on("connection", (socket: WebSocket) => {
    socket.on("message", (data: string) => {
        console.log(`User connected!`)
        const payload = JSON.parse(data);
        
        messageHandler({
            socket, 
            ...payload
        })
    })
})

const messageHandler = ({ socket, type, payload }: { socket: WebSocket, type: any, payload: any }) => {
    
    if (type === INCOMING_MESSAGE.INIT_GAME) {
        const { user, gameTime } = payload
        
        const player = { socket, user };
        gameManager.init(player, gameTime);
        return;
    }

    if (type === INCOMING_MESSAGE.MOVE) {
        const { id, player, move } = payload
        gameManager.move(id, player, move)
        return;
    }
    
}