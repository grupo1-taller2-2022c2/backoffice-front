import { useEffect } from "react"
import Navbar from "./Navbar"
import MyRoutes from "./router"
import { GetUserContext } from "./UserContext"

export function App(){
    const context = GetUserContext()

    useEffect(() => {
        console.log("User is logged in: " + context.userStatus.isLoggedIn)
        console.log("Display navbar: " + (context.userStatus.isLoggedIn && !context.atSignIn.value))
    },[context.userStatus])

    return (<>
    {(context.userStatus.isLoggedIn && !context.atSignIn.value)? (<Navbar/>) : (null)}
    <MyRoutes />
    </>)
}