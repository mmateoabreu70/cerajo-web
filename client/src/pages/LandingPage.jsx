import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>CERAJO</h1>
      <p>Diseños únicos que decoran y transforman tus espacios.</p>
      <Link to="/productos" className="cta-button">Ver Catalogo</Link>
    </div>
  );
}