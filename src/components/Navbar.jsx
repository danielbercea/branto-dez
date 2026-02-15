import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="/" aria-label="Branto-Dez Home">
          <img src="/images/brand/logo-1.png" alt="Branto-Dez" height="44" />
        </a>

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
