import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import ProductosPage from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <header>
        <div class="top-header">
          <img src="logo.png" alt="Logo" class="logo" />
          <input type="text" placeholder="¿Qué estás buscando?" class="search-box" />
        </div>

        <nav class="bottom-header">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="#">Contacto</Link>
          <Link to="#">OFERTAS</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productos" element={<ProductosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;