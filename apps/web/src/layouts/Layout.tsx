import { Outlet, useNavigate } from "react-router-dom"
import { firebaseApp } from "../firestore/store"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react";

const Layout = () => {
    const auth = getAuth(firebaseApp);
    const nav = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                nav("/login")
            }
        })
    }, [auth, nav])


    return (
        <main className="h-screen w-screen">
            <Outlet />
        </main>
    )
}


export default Layout