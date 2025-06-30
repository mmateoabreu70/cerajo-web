import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import '../styles/LandingPage.css';

export default function LandingPage() {
  return (
    <>
      <section className='hero'>
        <div className='overlay'>
          <div className='hero-content wrapper'>
            <h1>DESCUBRE LA<br /> CERÁMICA PERFECTA<br />PARA TU ESPACIO</h1>
            <p>Estilo, calidad y precio en un solo lugar</p>
            <Link to='/productos' className='hero-button'>Explorar catálogo</Link>
          </div>
        </div>
      </section>
      <section className='card-banner'>
        <div className='card-container'>
          <div className='card'>
            <img src='./images/floor-icon.png' alt='floor icon' />
            <span>Pisos</span>
          </div>
          <div className='card'>
            <img src='./images/shower-icon.png' alt='shower icon' />
            <span>Baños</span>
          </div>
          <div className='card'>
            <img src='./images/kitchen-icon.png' alt='kitchen icon' />
            <span>Cocinas</span>
          </div>
          <div className='card'>
            <img src='./images/exterior-icon.png' alt='exterior icon' />
            <span>Exterior</span>
          </div>
        </div>
      </section>
      <section className='featured-products'>
        <div className='wrapper'>
          <div className="featured-header">
            <h2>Productos destacados</h2>
            <Link className="view-all-button">Ver todos <span className='arrow'><FontAwesomeIcon icon={faArrowRight} /></span></Link>
          </div>
          <div className="product-grid">
            <div className="product-card">
              <img src="./images/psio-efecto-marmol.png" alt="Ceramica efecto marmol" />
              <p className='product-name'>Ceramica efecto marmol</p>
              <p className="price">RD$300 m²</p>
            </div>
            <div className="product-card">
              <img src="./images/subway.png" alt="Azulejo subway blanco" />
              <p className='product-name'>Azulejo subway blanco</p>
              <p className="price">RD$1200 / m²</p>
            </div>
            <div className="product-card">
              <img src="./images/psio-efecto-marmol.png" alt="Ceramica efecto marmol" />
              <p className='product-name'>Ceramica efecto marmol</p>
              <p className="price">RD$1200 / m²</p>
            </div>
            <div className="product-card">
              <img src="./images/psio-efecto-marmol.png" alt="Ceramica efecto marmol" />
              <p className='product-name'>Ceramica efecto marmol</p>
              <p className="price">RD$1200 / m²</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}