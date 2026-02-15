import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import ProductosPage from './pages/ProductsPage';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productos" element={<ProductosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;