import { useEffect, useState } from 'react';
import { http } from '../lib/http';
import ProductCard from '../components/product-card/ProductCard';
import '../styles/ProductsPage.css';
import { Paginator } from 'primereact/paginator';

const PAGE_SIZE = 24;

export default function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // PrimeReact paginator usa first (offset)
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGE_SIZE);

  const page = Math.floor(first / rows) + 1;

  useEffect(() => {
    async function load() {
      const fetchConfig = {
        url: '/productos',
        params: {
          page: String(page),
          limit: String(rows)
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
    <div className="wrapper catalog-container">
      <h2>Productos</h2>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
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
    </div>
  );
}