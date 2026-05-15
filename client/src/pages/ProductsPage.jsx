import { useEffect, useMemo, useState } from 'react';
import { http } from '../lib/http';
import { Paginator } from 'primereact/paginator';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import ProductCard from '../components/product-card/ProductCard';
import AppBreadcrumb from '../components/breadcrumb/Breadcrumb';
import EmptyState from '../components/empty-state/EmptyState';

import '../styles/ProductsPage.css';

const PAGE_SIZE = 24;
const ROW_OPTIONS = [12, 24, 48];

const CATEGORIES = [
  "Cerámica",
  "Porcelanato",
  "Baños",
  "Fregaderos",
  "Estufas empotrables",
  "Ferretería",
  "Accesorios y más",
];

const BRANDS = [
  "American Standard",
  "Bosch",
  "Grohe",
  "Interceramic",
  "Kohler",
  "Lamosa",
  "Pamesa",
  "Porcelanosa",
  "Roca",
  "San Lorenzo",
  "Sika",
  "Teka",
  "Tramontina",
];

function getNumberParam(value, fallback, allowedValues) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  if (allowedValues && !allowedValues.includes(parsed)) return fallback;
  return parsed;
}

export default function ProductosPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const q = searchParams.get("q") ?? "";
  const featured = searchParams.get("featured") === "1";
  const routeDiscount = location.pathname === "/ofertas";
  const discount = routeDiscount || searchParams.get("discount") === "1";
  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const page = getNumberParam(searchParams.get("page"), 1);
  const rows = getNumberParam(searchParams.get("limit"), PAGE_SIZE, ROW_OPTIONS);
  const first = (page - 1) * rows;

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageTitle = useMemo(() => {
    if (routeDiscount || discount) return "Ofertas";
    if (featured) return "Productos destacados";
    if (q) return `Resultados para "${q}"`;
    return "Productos";
  }, [discount, featured, q, routeDiscount]);

  const updateParams = (updates, resetPage = true) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === false || value == null) next.delete(key);
      else next.set(key, String(value));
    });

    if (resetPage) next.set("page", "1");
    if (routeDiscount) next.delete("discount");

    const query = next.toString();
    navigate(`${location.pathname}${query ? `?${query}` : ""}`);
  };

  const clearFilters = () => {
    navigate(location.pathname === "/ofertas" ? "/ofertas?discount=1" : "/productos");
  };

  useEffect(() => {
    let alive = true;

    async function load() {
      const params = {
        page,
        limit: rows,
      };

      if (q) params.q = q;
      if (featured) params.featured = 1;
      if (discount) params.discount = 1;
      if (category) params.category = category;
      if (brand) params.brand = brand;

      try {
        setLoading(true);
        setError("");

        const res = await http({ url: '/productos', params });
        if (!alive) return;

        setProducts(res.data.items ?? []);
        setTotal(res.data.total ?? 0);
      }
      catch (err) {
        if (!alive) return;
        setProducts([]);
        setTotal(0);
        setError("No se pudieron cargar los productos. Intenta nuevamente.");
      }
      finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [brand, category, discount, featured, page, q, rows]);

  return (
    <div className="wrapper">
      <AppBreadcrumb />

      <div className="divider"></div>

      <section className="catalog-header">
        <div>
          <h1 className="catalog-title">{pageTitle}</h1>
          <span className="counter">{total} resultados</span>
        </div>

        <button className="clear-filters-button" onClick={clearFilters}>
          Limpiar filtros
        </button>
      </section>

      <section className="filters-panel" aria-label="Filtros de productos">
        <label>
          Departamento
          <select value={category} onChange={(e) => updateParams({ category: e.target.value })}>
            <option value="">Todos</option>
            {CATEGORIES.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label>
          Marca
          <select value={brand} onChange={(e) => updateParams({ brand: e.target.value })}>
            <option value="">Todas</option>
            {BRANDS.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label className="checkbox-filter">
          <input
            type="checkbox"
            checked={discount}
            disabled={routeDiscount}
            onChange={(e) => updateParams({ discount: e.target.checked ? "1" : "" })}
          />
          Solo ofertas
        </label>
      </section>

      <div className="catalog-container">
        {loading && <div className="catalog-state">Cargando productos...</div>}

        {!loading && error && (
          <EmptyState
            title="No se pudo cargar el catálogo"
            description={error}
            actionLabel="Reintentar"
            onAction={() => window.location.reload()}
          />
        )}

        {!loading && !error && products.length === 0 && (
          <EmptyState actionLabel="Ver productos" onAction={clearFilters} />
        )}

        {!loading && !error && products.length > 0 && (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {!loading && !error && products.length > 0 && (
        <div className="paginator-container">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={total}
            rowsPerPageOptions={ROW_OPTIONS}
            onPageChange={(e) => {
              updateParams({
                page: Math.floor(e.first / e.rows) + 1,
                limit: e.rows,
              }, false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
}
