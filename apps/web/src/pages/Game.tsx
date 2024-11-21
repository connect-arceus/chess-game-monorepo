import MoveList from "../components/MoveList"
import { useRecoilState } from "recoil";
import { gameHistory } from "../store/store";



const Game = () => {

    const [history] = useRecoilState(gameHistory)
    
    return (
        <>
            <div className="w-1/3 h-full flex flex-col justify-between items-center bg-[#313131] py-8 px-4 relative">
                {/* END GAME */}
                {/* GAME MOVE LIST */}
                <MoveList history={history} />
                <button className="w-full bg-red-800 py-4 rounded font-bold text-2xl">
                    Resign
                </button>
            </div>
        </>     
    )
}


export default Game