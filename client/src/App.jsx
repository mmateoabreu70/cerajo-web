import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import ProductosPage from './pages/ProductsPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {
  const navIsActive = ({ isActive }) => isActive ? "nav-active" : "";

  return (
    <BrowserRouter>
      <header>
        <div className='wrapper header-content'>
          <div className="logo-area">
            <img src="/main-logo.png" alt="Cerajo Logo" />
          </div>
          <nav className="nav-links">
            <NavLink className={navIsActive} to="/">Inicio</NavLink>
            <NavLink className={navIsActive} to="/productos">Productos</NavLink>
            <NavLink className={navIsActive} to="/contacto">Contacto</NavLink>
            <NavLink className="offer-button" to="/oferta">OFERTAS!</NavLink>
            <button className="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productos" element={<ProductosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;