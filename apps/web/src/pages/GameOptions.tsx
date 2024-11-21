import GameOptions from "../components/GameOptions";

import { GameContextType } from "../layouts/GameLayout";
import { useOutletContext } from "react-router-dom";


const Game = () => {

    const { socket, user } = useOutletContext<GameContextType>();

    const initGame = () => {
        if (!user) return;

        const payload = JSON.stringify({
            type: "INIT_GAME",
            payload: {
                user: {
                    id: user.uid,
                    name: user.displayName,
                },
            },
        });
        socket?.send(payload)
    }


    return (
        <>

            <div className="w-1/3 h-full flex flex-col justify-between items-center bg-[#313131] py-8 px-4 relative">
                {
                    status === "WAITING" && (
                        <div className="absolute z-50 w-full h-full top-0 left-0 bg-black flex justify-center items-center">
                            WAITING
                        </div>
                    )
                }
                <GameOptions />                
                <button
                    onClick={() => initGame()}
                    className="font-bold text-white bg-green-600 w-full py-4 rounded-lg text-2xl"
                >
                    Play
                </button>
            </div>
        </>
    );
}


export default Game