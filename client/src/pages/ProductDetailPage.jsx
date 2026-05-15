import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tag } from "primereact/tag";
import AppBreadcrumb from "../components/breadcrumb/Breadcrumb";
import EmptyState from "../components/empty-state/EmptyState";
import { http } from "../lib/http";
import { buildProductWhatsAppUrl } from "../lib/whatsapp";
import "../styles/ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await http({ url: `/productos/${id}` });
        if (!alive) return;
        setProduct(res.data);
      }
      catch (err) {
        if (!alive) return;
        setProduct(null);
        setError(err.response?.status === 404 ? "Producto no encontrado." : "No se pudo cargar el producto.");
      }
      finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [id]);

  const discountPercent = useMemo(() => {
    if (!product?.discount || !product.oldPrice) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }, [product]);

  if (loading) {
    return (
      <main className="wrapper product-detail-page">
        <AppBreadcrumb />
        <div className="detail-state">Cargando producto...</div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="wrapper product-detail-page">
        <AppBreadcrumb />
        <EmptyState
          title={error}
          description="Puedes volver al catálogo para explorar otros productos disponibles."
          actionLabel="Ver productos"
          onAction={() => window.location.href = "/productos"}
        />
      </main>
    );
  }

  return (
    <main className="wrapper product-detail-page">
      <AppBreadcrumb getProductName={() => product.name} />

      <section className="product-detail">
        <div className="detail-gallery">
          <img src={product.image} alt={product.name} className="detail-main-image" />
          <img src={product.previewImage} alt={`${product.name} vista previa`} className="detail-preview-image" />
        </div>

        <div className="detail-info">
          <div className="detail-tags">
            {product.isNew && <Tag value="Nuevo" severity="info" />}
            {product.discount && <Tag value="Oferta" severity="danger" />}
            {discountPercent > 0 && <Tag value={`-${discountPercent}%`} severity="danger" />}
          </div>

          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>

          <dl className="detail-meta">
            <div>
              <dt>Departamento</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>Marca</dt>
              <dd>{product.brand}</dd>
            </div>
          </dl>

          <div className="detail-price-block">
            {product.discount && (
              <span className="detail-old-price">RD$ {product.oldPrice.toLocaleString("es-DO")}</span>
            )}
            <span className={`detail-price ${product.discount ? "is-discount" : ""}`}>
              RD$ {product.price.toLocaleString("es-DO")}
            </span>
          </div>

          <div className="detail-actions">
            <a
              className="whatsapp-button"
              href={buildProductWhatsAppUrl(product)}
              target="_blank"
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
            <Link className="secondary-link" to="/productos">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
