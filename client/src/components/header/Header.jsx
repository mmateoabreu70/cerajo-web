import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import "./Header.css";
import SearchBar from "../search-bar/SearchBar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navIsActive = ({ isActive }) => isActive ? "nav-active" : "";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header>
      <div className="wrapper header-content">
        <Link className="home-link" to="/">
          <div className="brand-container">
            <img src="/cerajo-icon.png" alt="Cerajo Logo" className="brand-logo" />

            <div className="brand-text">
              <h1>CERAJO</h1>
              <span>Calidad en cada pisada</span>
            </div>
          </div>
        </Link>

        <SearchBar className="header-search" />

        <div className="hamburger-wrap">
          <Hamburger toggled={open} toggle={setOpen} size={30} />
        </div>

        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          <NavLink className={navIsActive} to="/">Inicio</NavLink>
          <NavLink className={navIsActive} to="/productos">Productos</NavLink>
          <NavLink className={navIsActive} to="/contacto">Contacto</NavLink>
          <NavLink className="offer-link" to="/ofertas?discount=1">OFERTAS!</NavLink>
        </nav>

        {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
      </div>
    </header>
  );
}
