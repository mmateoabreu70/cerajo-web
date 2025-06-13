import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import ProductosPage from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <header className="main-header">
        <div className="logo">CERA</div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
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