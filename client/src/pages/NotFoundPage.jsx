import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <main className="wrapper not-found-page">
      <p className="not-found-code">404</p>
      <h1>Página no encontrada</h1>
      <p>La dirección que abriste no existe o ya no está disponible.</p>
      <Link to="/productos">Ver catálogo</Link>
    </main>
  );
}
