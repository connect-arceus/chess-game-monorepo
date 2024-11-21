import { Outlet } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { User } from "firebase/auth";

import Chessboard from "../components/Chessboard";
import { useEffect } from "react";
import { useMessageParser } from "../hooks/useMessageParser";
import { useRecoilState } from "recoil";
import { gameId } from "../store/store";

export type GAME_TIME = 10 | 15 | 20;

export type GameContextType = {
    socket: WebSocket;
    user: User | null;
};

const GameLayout = ({ user }: { user: User | null }) => {
    const socket = useSocket();
    const parseMessage = useMessageParser();
    const [id] = useRecoilState(gameId)

    const movePiece = (move: { from: string; to: string; }) => {
        console.log(move)
        const payload = {
            type: "MOVE",
            payload: {
                id,
                player: {
                    id: user?.uid,
                    name: user?.displayName,
                },
                move
            }
        }
        socket?.send(JSON.stringify(payload))
    }

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = ({ data }) => {
            parseMessage(data);
        };
    }, [socket, parseMessage]);

    if (!socket) return;

    return (
        <main className="h-full w-full flex justify-center items-center px-10 py-10 relative">
            {/* <GameWaitingOverlay /> */}
            <div className="w-3/5 flex justify-center items-center">
                <Chessboard movePiece={movePiece} />
            </div>
            <Outlet context={{ socket, user } satisfies GameContextType} />
        </main>
    );
};

export default GameLayout;
