import { useRecoilState } from "recoil"
import { gameTime } from "../store/store"

const GameOptions = () => {

    const [time, setTime] = useRecoilState(gameTime)
    

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col items-center gap-y-4">
                <p>Game Time</p>
                <div className="w-full grid grid-cols-3 justify-items-center">
                    <button
                        onClick={() => setTime(10)}
                        className={`px-4 py-2 bg-[#242424] w-fit border-2 transition-all rounded-md ${
                            time === 10 ? "border-white" : "border-transparent"
                        }`}
                    >
                        10 min
                    </button>
                    <button
                        onClick={() => setTime(15)}
                        className={`px-4 py-2 bg-[#242424] w-fit border-2 transition-all rounded-md ${
                            time === 15 ? "border-white" : "border-transparent"
                        }`}
                    >
                        15 min
                    </button>
                    <button
                        onClick={() => setTime(20)}
                        className={`px-4 py-2 bg-[#242424] w-fit border-2 transition-all rounded-md ${
                            time === 20 ? "border-white" : "border-transparent"
                        }`}
                    >
                        20 min
                    </button>
                </div>
            </div>
        </div>
    )
}


export default GameOptions