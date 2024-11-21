import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from "./layouts/Layout"
import GameLayout from "./layouts/GameLayout"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Game from "./pages/Game"
import GameOptions from "./pages/GameOptions"

import { useState } from "react"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { firebaseApp } from "./firestore/store"

const App = () => {

    const [user, setUser] = useState<User | null>(null);
    
    // auth mgr
    const auth = getAuth(firebaseApp)
    onAuthStateChanged(auth, user => {
        if (user) {
            setUser(user)
        }
    })

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="game" element={<GameLayout user={user} />} >
                        <Route index element={<GameOptions />} />
                        <Route path=":id" element={<Game />} />
                    </Route>
                </Route>
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}


export default App