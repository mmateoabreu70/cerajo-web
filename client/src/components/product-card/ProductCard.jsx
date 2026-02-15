import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import './ProductCard.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const {
    discount: hasDiscount,
    isNew,
    image,
    name,
    previewImage,
    oldPrice,
    price
  } = product;

  const pct = hasDiscount ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <Link to={`/productos/${product.id}`} className="product-link">
      <div
        className="product-card-wrapper"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card className="product-card">
          <div className="image-container">
            {isNew && (
              <Tag value="Nuevo" severity="info" className="badge-top"></Tag>
            )}
            
            {hasDiscount && (
              <Tag value="Oferta" severity="danger" className="badge-top" />
            )}

            <img
              src={image}
              alt={name}
              className={`product-image ${hovered ? 'fade-out' : ''}`}
            />

            <img
              src={previewImage}
              alt={name}
              className={`product-image preview ${hovered ? 'fade-in' : ''}`}
            />

            <div className={`hover-actions ${hovered ? 'show' : ''}`}>
              <Button
                icon="pi pi-shopping-cart"
                label="Agregar"
                className="p-button- p-button-sm"
              />
            </div>

          </div>

          <div className="product-info">
            <h4>{name}</h4>
            
            <div className="price-container">
              { hasDiscount && (
                <span className="price-old">RD$ {oldPrice.toLocaleString("es-DO")}</span>
              )}

              <div className="price-row">
                <div className={`price-new ${hasDiscount ? "is-discount" : ""}`}>
                  <span className="currency">RD$</span>
                  <span className="amount">{price.toLocaleString("es-DO")}</span>
                </div>

                {hasDiscount && (
                  <Tag value={`-${pct}%`} severity="danger" className="discount-tag" />
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Link>
  )
}