import {PAGE_UNAVAILABLE_MSG} from "./Constants"
import { GetUserContext } from "./UserContext"
export default function Metricas(){
  const context = GetUserContext()
  if (!context.userStatus.isLoggedIn){
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>
  }

  return <h1>Metricas</h1>  
}