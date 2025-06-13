import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img 
        src={hovered ? product.ambient : product.imagen}
        alt={product.nombre}
        className="product-image"
      />
      <p className="product-name">{product.nombre}</p>
    </div>
  )
}