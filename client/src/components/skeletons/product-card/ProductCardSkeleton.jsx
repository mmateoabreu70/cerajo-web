import Skeleton from "react-loading-skeleton";

import "./ProductCardSkeleton.css";

export default function ProductCardSkeleton() {
  return (
    <div className="product-card">
      <Skeleton height={240} />
      <div style={{ padding: "12px" }}>
        <Skeleton height={18} width="80%" />
        <Skeleton height={14} width="55%" style={{ marginTop: 8 }} />
        <Skeleton height={22} width="45%" style={{ marginTop: 12 }} />
      </div>
    </div>
  );
}