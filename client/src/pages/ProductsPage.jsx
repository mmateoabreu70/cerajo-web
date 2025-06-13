import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../styles/ProductsPage.css';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/productos')
      .then(res => { 
        console.log(res.data)
        setProductos(res.data)
      });
  }, []);

  return (
    <div className="productos-page">
      <h2>Nuestros Productos</h2>
      <div className="grid">
        {productos.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}