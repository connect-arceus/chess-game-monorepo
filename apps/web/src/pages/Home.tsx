import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"


const Home = () => {

    // const auth = getAuth(firebaseApp)
    const nav = useNavigate();

    return (
        <div className="w-full h-full flex flex-col gap-10 items-center">
            <Navbar />
            <div className="flex flex-col gap-8 w-1/5">
                <button onClick={() => nav('/game')} className="w-full bg-green-800 py-10 rounded font-bold text-2xl">
                    Play Game
                </button>
                <button className="w-full bg-white text-green-800 py-10 rounded font-bold text-2xl">
                    Join Game
                </button>
            </div>
        </div>
    )
}


export default Home