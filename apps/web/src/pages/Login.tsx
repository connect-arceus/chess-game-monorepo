import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseApp } from "../firestore/store";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const nav = useNavigate()

    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp)

    const googleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            if (result.user) {
                nav("/")
            }
        })
    }

    if (auth.currentUser) {
        return (
            <div className="flex flex-col gap-4 justify-center items-center text-white w-screen">
                <p>
                    User already logged in
                </p>
                <button onClick={() => nav("/")} className="bg-white rounded px-8 py-4 text-black w-fit font-semibold">
                    Go Home
                </button>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center text-white w-screen">
            <button onClick={() => googleLogin()} className="bg-white rounded px-8 py-4 text-black font-semibold">
                Google Login
            </button>
        </div>
    )
}


export default Login