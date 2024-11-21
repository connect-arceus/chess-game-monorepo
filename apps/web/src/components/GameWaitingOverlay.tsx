import gameWaiting from "../assets/game_waiting.png"

const GameWaitingOverlay = () => {

    const clearGame = () => {
        
    }

    return (
        <div className="w-screen h-screen absolute flex justify-center items-center top-0 left-0 z-20">
            <div className="w-fit h-fit py-10 px-8 z-40 bg-[#343434] rounded-lg flex flex-col justify-center items-center gap-20">
                <p>Waiting for player...</p>
                <button onClick={clearGame} className="bg-green-800 px-8 py-4">Cancel</button>
            </div>
            <img src={gameWaiting} className="w-full h-full absolute z-20 top-0 left-0" alt="Game Waiting" />
        </div>
    )
}


export default GameWaitingOverlay