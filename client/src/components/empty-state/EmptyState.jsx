import { FiSearch } from "react-icons/fi";
import "./EmptyState.css"

export default function EmptyState({
  title = "No se encontraron productos",
  description = "Intenta cambiar los filtros o realizar una nueva búsqueda.",
  actionLabel,
  onAction
}) {
  return (
    <div className="empty-container">
      <div className="empty-card">

        <div className="empty-icon-wrapper">
          <FiSearch className="empty-icon" />
        </div>

        <h2 className="empty-title">{title}</h2>
        <p className="empty-description">{description}</p>

        {actionLabel && (
          <button className="empty-button" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
