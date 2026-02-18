import LandingPage from "./pages/LandingPage";
import ProductosPage from "./pages/ProductsPage";

export const routesConfig = [
  {
    path: "/",
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
    element: null,
    crumb: ({ params, getProductName }) => ({
      label: getProductName(params.id) ?? `Producto ${params.id}`,
      // último normalmente sin "to"
    }),
  },
];