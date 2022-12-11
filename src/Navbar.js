import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {navbarItem} from "./styles"
export default function Navbar() {
  return (
    <nav
      className="nav"
      style={{
        backgroundColor: "teal",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 2,
        padding: 1,
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
        <CustomLink style={navbarItem} to="/home">Home</CustomLink>
        <CustomLink style={navbarItem} to="/metricas">Metricas</CustomLink>
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
