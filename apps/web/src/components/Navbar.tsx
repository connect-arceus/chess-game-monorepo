import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { useState } from "react"
import { firebaseApp } from "../firestore/store"

const Navbar = () => {

    const [user, setUser] = useState<User | null>(null)

    const auth = getAuth(firebaseApp)

    onAuthStateChanged(auth, user => {
        if (user) {
            setUser(user)
        }
    })

    return (
        <nav className="h-20 w-full bg-[#313131] shadow-md px-10 flex items-center justify-between">
            <p className="text-white font-bold text-3xl tracking-tighter">Chess Game</p>
            {
                user && (
                    <div className="relative inline-block text-left">
                        <button className="flex items-center focus:outline-none">
                            <img
                                referrerPolicy="no-referrer"
                                src={user.photoURL as string}
                                alt="User Acatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="ml-3 text-white">{user.displayName || user.email}</span>
                        </button>
                    </div>
                )
            }
        </nav>
    )
}


export default Navbar