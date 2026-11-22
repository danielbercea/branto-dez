import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" aria-label="Branto-Dez — Acasă">
          <img src={`${import.meta.env.BASE_URL}images/brand/logo-1.png`} alt="Branto-Dez" height="44" />
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/domenii">Domenii</NavLink>
          <NavLink to="/servicii">Servicii</NavLink>
          <NavLink to="/legislatie">Legislație</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
