import LandingPage from "./pages/LandingPage";
import ProductosPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export const routesConfig = [
  {
    path: "/",
    index: true,
    element: <LandingPage />,
    crumb: () => ({ label: "Inicio", to: "/" }),
  },
  {
    path: "/productos",
    element: <ProductosPage />,
    crumb: () => ({ label: "Productos", to: "/productos" }),
  },
  {
    path: "/productos/:id",
    element: <ProductDetailPage />,
    crumb: ({ params, getProductName }) => ({
      label: getProductName?.(params.id) ?? `Producto ${params.id}`,
    }),
  },
  {
    path: "/ofertas",
    element: <ProductosPage />,
    crumb: () => ({ label: "Ofertas" }),
  },
  {
    path: "/buscar",
    element: <ProductosPage />,
    crumb: () => ({ label: "Buscar" }),
  },
  {
    path: "/contacto",
    element: <ContactPage />,
    crumb: () => ({ label: "Contacto" }),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
