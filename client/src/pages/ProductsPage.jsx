import { useEffect, useState } from 'react';
import { http } from '../lib/http';
import ProductCard from '../components/product-card/ProductCard';
import '../styles/ProductsPage.css';
import { Paginator } from 'primereact/paginator';
import EmptyState from '../components/empty-state/EmptyState';
import AppBreadcrumb from '../components/breadcrumb/Breadcrumb';
import { useSearchParams } from 'react-router-dom';

const PAGE_SIZE = 24;

export default function ProductosPage() {
  const [searchParams] = useSearchParams();
  const qFromUrl = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(qFromUrl);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setQuery(qFromUrl);
  }, [qFromUrl]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGE_SIZE);

  const page = Math.floor(first / rows) + 1;

  useEffect(() => {
    async function load() {
      const fetchConfig = {
        url: '/productos',
        params: {
          page: page,
          limit: rows
        }
      }

      if (query) {
        fetchConfig.params.q = query;
      }

      try {
        const res = await http(fetchConfig);
        const data = res.data;

        setProducts(data.items ?? []);
        setTotal(data.total ?? 0);

        console.log("Productos cargados:", data);
      }
      catch (err) {
        throw new Error(`Error cargando productos: ${err}`)
      }
    }

    load().catch(console.error);
  }, [page, rows, query]);

  return (
    <div className="wrapper">
      <AppBreadcrumb />
      
      <div class="divider"></div>
      
      { query && <h1 className="q-text">Resultados para "{query}"</h1>}
      
      <div className="catalog-container">
        <span className="counter">{total} resultados</span>
        
        {products.length === 0 && (
          <EmptyState actionLabel="Ver productos" onAction={() => window.location.href = "/productos"} />
        )}

        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {products.length > 0 && (
        <div className="paginator-container">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={total}
            rowsPerPageOptions={[12, 24, 48]}
            onPageChange={(e) => {
              setFirst(e.first);
              setRows(e.rows);
            }}
          />
        </div>
      )}
    </div>  
  );
}