import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

export default function Header() {
  const navIsActive = ({ isActive }) => isActive ? "nav-active" : "";

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
        <nav className="nav-links">
          <NavLink className={navIsActive} to="/">Inicio</NavLink>
          <NavLink className={navIsActive} to="/productos">Productos</NavLink>
          <NavLink className={navIsActive} to="/contacto">Contacto</NavLink>
          <NavLink className="offer-link" to="/ofertas">OFERTAS!</NavLink>
          <button className="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>z
        </nav>
      </div>
    </header>
  );
}