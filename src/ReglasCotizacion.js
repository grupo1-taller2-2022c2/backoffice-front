import {PAGE_UNAVAILABLE_MSG} from "./Constants"
import { GetUserContext } from "./UserContext"
export default function ReglasCotizacion(){
  const context = GetUserContext()
  if (!context.userStatus.isLoggedIn){
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>
  }

  return <h1>Modificar Reglas de Cotizacion</h1>  
}