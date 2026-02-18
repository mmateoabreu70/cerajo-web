import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Squash as Hamburger } from 'hamburger-react'
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const navIsActive = ({ isActive }) => isActive ? "nav-active" : "";

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Bloquea scroll del body cuando el menú móvil está abierto
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
      <div className='wrapper header-content'>
        <div class="brand-container">
          <img src="/cerajo-icon.png" alt="Cerajo Logo" class="brand-logo" />

          <div class="brand-text">
            <h1>CERAJO</h1>
            <p>Calidad en cada pisada</p>
          </div>
        </div>
        
        <div className="hamburger-wrap">
          <Hamburger toggled={open} toggle={setOpen} size={30} />
        </div>

         <nav className={`nav-links ${open ? "is-open" : ""}`}>
          <NavLink className={navIsActive} to="/">Inicio</NavLink>
          <NavLink className={navIsActive} to="/productos">Productos</NavLink>
          <NavLink className={navIsActive} to="/contacto">Contacto</NavLink>
          <NavLink className="offer-link" to="/ofertas">OFERTAS!</NavLink>
          {/* <button className="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></button> */}
        </nav>

        {/* Overlay para cerrar al tocar fuera */}
        {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
      </div>
    </header>
  );
}