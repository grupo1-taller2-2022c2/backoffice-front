import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {Button} from "@chakra-ui/react"
import {navbarItem} from "./styles"
import { GetUserContext } from "./UserContext"
export default function Navbar() {
  const context = GetUserContext()

  return (
    <nav
      className="nav"
      style={{
        backgroundColor: "#07A4A4",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 2,
        padding: 7,
      }}
    >
      <ul
        style={{
          padding: 0,
          margin: 0,
          listStyle: "none",
          display: "flex",
          gap: 4,
        }}
      >
        <CustomLink style={navbarItem} to="/usuarios">Usuarios</CustomLink>
        <CustomLink style={navbarItem} to="/metricas">Metricas</CustomLink>
        <CustomLink style={navbarItem} to="/reglas-cotizacion">Reglas de Cotizacion</CustomLink>
      </ul>
      <ul style={{listStyle: "none"}}>
        <CustomLink style={navbarItem} to="/">Salir</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
