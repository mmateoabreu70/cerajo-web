import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/ProductCard";
import { http } from "../../lib/http";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./FeaturedProducts.css";
import ProductCardSkeleton from "../../components/skeletons/product-card/ProductCardSkeleton";

const LIMIT=8;

export default function FeaturedProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await http({
          url: "/productos",
          params: { featured: 1, limit: LIMIT, page: 1 }
        });

        if (!alive) return;
        setItems(res.data?.items ?? []);
      }
      catch (e) {
        if (!alive) return;
        setError("No se pudieron cargar los destacados.");
      }
      finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, []);

  return (
    <section className='featured-products'>
      <div className='wrapper'>
        <div className="featured-header">
          <h2>Productos destacados</h2>
          <Link className="view-all-button" to="/productos?featured=1">
            Ver todos{" "}
            <span className='arrow'>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </Link>
        </div>
      </div> 

      {!loading && error && <div className="featured-state error">{error}</div>}
      
      <div className="product-grid">
        {loading && Array.from({ length: 6 })
          .map((_, i) => (<ProductCardSkeleton key={i} />))}
        
        {!loading && !error && (
          items.map(p => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}