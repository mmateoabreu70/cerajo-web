import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="wrapper footer-content">

        {/* Columna 1 */}
        <div className="footer-column">
          <h3>CERAJO</h3>
          <p>
            Calidad en cada pisada.  
            Cerámicas modernas y clásicas para transformar tus espacios.
          </p>
        </div>

        {/* Columna 2 */}
        <div className="footer-column">
          <h4>Enlaces</h4>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/ofertas">Ofertas</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </div>

        {/* Columna 3 */}
        <div className="footer-column">
          <h4>Contacto</h4>
          <p>Santo Domingo, RD</p>
          <p>info@cerajo.com</p>
          <p>+1 (809) 000-0000</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CERAJO. Todos los derechos reservados.
      </div>
    </footer>
  );
}