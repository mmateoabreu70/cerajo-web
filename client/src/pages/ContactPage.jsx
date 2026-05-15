import AppBreadcrumb from "../components/breadcrumb/Breadcrumb";
import "../styles/ContactPage.css";

export default function ContactPage() {
  return (
    <main className="wrapper contact-page">
      <AppBreadcrumb />

      <section className="contact-layout">
        <div>
          <h1>Contacto</h1>
          <p>
            Estamos en Santo Domingo, RD. Escríbenos para consultar disponibilidad,
            precios y recomendaciones para tu proyecto.
          </p>
        </div>

        <div className="contact-list">
          <a href="mailto:info@cerajo.com">info@cerajo.com</a>
          <a href="tel:+18090000000">+1 (809) 000-0000</a>
          <span>Santo Domingo, RD</span>
        </div>
      </section>
    </main>
  );
}
