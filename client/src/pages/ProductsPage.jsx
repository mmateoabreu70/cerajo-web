import { useEffect, useState } from 'react';
import { http } from '../lib/http';
import ProductCard from '../components/product-card/ProductCard';
import '../styles/ProductsPage.css';
import { Paginator } from 'primereact/paginator';
import EmptyState from '../components/empty-state/EmptyState';
import AppBreadcrumb from '../components/breadcrumb/Breadcrumb';

const PAGE_SIZE = 24;

export default function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

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

      try {
        const res = await http(fetchConfig);
        const data = res.data;

        setProducts(data.items ?? []);
        setTotal(data.total ?? 0);
      }
      catch (err) {
        throw new Error(`Error cargando productos: ${err}`)
      }
    }

    load().catch(console.error);
  }, [page, rows]);

  return (
    <>
      <AppBreadcrumb />
      <div className="wrapper catalog-container">
        <span className="counter">{total} resultados</span>
        
        {products.length === 0 && (
          <EmptyState actionLabel="Ver productos" onAction={() => window.location.href = "/productos"} />
        )}

        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
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
    </>  
  );
}