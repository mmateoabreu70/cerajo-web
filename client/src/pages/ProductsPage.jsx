import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/product-card/ProductCard';
import '../styles/ProductsPage.css';

export default function ProductosPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/productos')
      .then(res => { 
        console.log(res.data)
        setProducts(res.data)
      });
  }, []);

  return (
    <div className="catalog-container">
      <h2>Catálogo de Productos</h2>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}