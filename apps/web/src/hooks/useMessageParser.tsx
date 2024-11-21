/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { boardFen, checkState, gameHistory, gameId, userColor } from "../store/store";

export const useMessageParser = () => {
    const nav = useNavigate();
    const [board, setBoard] = useRecoilState(boardFen)
    const [id, setId] = useRecoilState(gameId)
    const [color, setColor] = useRecoilState(userColor)
    const [history, setHistory] = useRecoilState(gameHistory)
    const [check, setCheck] = useRecoilState(checkState)

    const parseMessage = (message: string) => {
        const data = JSON.parse(message);
        const { type, payload } = data;

        if (type === "INIT_GAME") {
            setId(payload.id)
            setColor(payload.player.color)
            nav(`/game/${payload.id}`);
            return;
        }

        if (type === "MOVE") {
            setBoard(payload.fen)
            setHistory(payload.history)
            setCheck(payload.check)
            return;
        }

        if (type === "GAME_OVER")  {
            console.log(payload)
            return;
        }
    };

    return parseMessage;
};
