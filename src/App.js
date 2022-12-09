import {Navbar} from "./Navbar"
import MyRoutes from "./router"
import { GetUserContext } from "./UserContext"

export function App(){
    const context = GetUserContext()

    return (<>
    {context.userStatus.isLoggedIn? (<Navbar/>) : (null)}
    <MyRoutes />
    </>)
}