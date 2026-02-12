import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="product-card-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="product-card">
        <div className="image-container">

          {/* Badge */}
          
          {product.isNew && (
            <Tag value="Nuevo" severity="info" className="badge-top"></Tag>
          )}
          
          {product.discount && (
            <Tag value="Oferta" severity="danger" className="badge-top" />
          )}

          {/* Imagen base */}
          <img
            src={product.image}
            alt={product.name}
            className={`product-image ${hovered ? 'fade-out' : ''}`}
          />

          {/* Imagen preview */}
          <img
            src={product.previewImage}
            alt={product.name}
            className={`product-image preview ${hovered ? 'fade-in' : ''}`}
          />

          {/* Botón flotante */}
          <div className={`hover-actions ${hovered ? 'show' : ''}`}>
            <Button
              icon="pi pi-shopping-cart"
              label="Agregar"
              className="p-button- p-button-sm"
            />
          </div>

        </div>

        <div className="product-info">
          <h4>{product.name}</h4>

          {product.discount ? (
            <div className="price-container">
              <span className="price old-price">
                RD${product.oldPrice}
              </span>
              <span className="price">
                RD${product.price} / m²
              </span>
            </div>
          ) : (
            <p className="price">
              RD${product.price} / m²
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}