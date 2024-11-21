import { createContext, useEffect, useState } from "react";

const URL = "http://127.0.0.1:8080/"
export const SocketContext = createContext<WebSocket | null>(null)

interface ISocketProvider {
    children: JSX.Element | JSX.Element[]
}

export const SocketProvider = ({children}: ISocketProvider) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(URL);

        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <SocketContext.Provider
            value={socket}
        >
            {children}
        </SocketContext.Provider>
    );
}