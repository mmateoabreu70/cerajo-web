import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import FeaturedProducts from '../sections/featured-products/FeaturedProducts';

export default function LandingPage() {
  return (
    <>
      <section className='hero'>
        <div className='overlay'>
          <div className="wrapper">
            <div className='hero-content'>
              <h1>DESCUBRE LA<br /> CERÁMICA PERFECTA<br />PARA TU ESPACIO</h1>
              <p>Estilo, calidad y precio en un solo lugar</p>
              <Link to='/productos' className='hero-button'>Explorar catálogo</Link>
            </div>
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
      <FeaturedProducts />
    </>
  );
}