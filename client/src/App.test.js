import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { http } from './lib/http';

jest.mock('./lib/http', () => ({
  http: jest.fn(),
}));

jest.mock('primereact/button', () => ({
  Button: ({ label, icon, ...props }) => <button type="button" {...props}>{icon} {label}</button>,
}), { virtual: true });

jest.mock('primereact/card', () => ({
  Card: ({ children, className }) => <div className={className}>{children}</div>,
}), { virtual: true });

jest.mock('primereact/tag', () => ({
  Tag: ({ value, className }) => <span className={className}>{value}</span>,
}), { virtual: true });

jest.mock('primereact/paginator', () => ({
  Paginator: () => <nav aria-label="Paginación" />,
}), { virtual: true });

jest.mock('primereact/breadcrumb', () => ({
  BreadCrumb: () => <nav aria-label="Breadcrumb" />,
}), { virtual: true });

jest.mock('primereact/iconfield', () => ({
  IconField: ({ children }) => <div>{children}</div>,
}), { virtual: true });

jest.mock('primereact/inputicon', () => ({
  InputIcon: (props) => <button type="button" aria-label="Buscar" {...props} />,
}), { virtual: true });

jest.mock('primereact/inputtext', () => ({
  InputText: (props) => <input {...props} />,
}), { virtual: true });

jest.mock('react-router-dom', () => {
  const React = require('react');

  function pathMatches(routePath, pathname) {
    if (routePath === '*') return true;
    if (routePath === pathname) return true;
    if (routePath === '/productos/:id') return /^\/productos\/[^/]+$/.test(pathname);
    return false;
  }

  return {
    BrowserRouter: ({ children }) => <>{children}</>,
    Routes: ({ children }) => {
      const pathname = globalThis.location.pathname;
      const routes = React.Children.toArray(children);
      const match = routes.find(route => route.props.path !== '*' && pathMatches(route.props.path, pathname))
        || routes.find(route => route.props.path === '*');
      return match?.props.element ?? null;
    },
    Route: () => null,
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
    NavLink: ({ children, to, className = '', ...props }) => {
      const resolvedClassName = typeof className === 'function'
        ? className({ isActive: globalThis.location.pathname === to })
        : className;
      return <a href={to} className={resolvedClassName} {...props}>{children}</a>;
    },
    useLocation: () => ({
      pathname: globalThis.location.pathname,
      search: globalThis.location.search,
    }),
    useNavigate: () => (to) => globalThis.history.pushState({}, '', to),
    useParams: () => {
      const match = globalThis.location.pathname.match(/^\/productos\/([^/]+)$/);
      return match ? { id: match[1] } : {};
    },
    useSearchParams: () => [new URLSearchParams(globalThis.location.search)],
    matchRoutes: () => [],
  };
}, { virtual: true });

const App = require('./App').default;

const sampleProduct = {
  id: 1,
  name: 'Azulejo Cerámico Blanco Brillo 20x20',
  category: 'Cerámica',
  brand: 'Lamosa',
  description: 'Azulejo cerámico para pared, acabado brillo.',
  image: 'https://example.com/product.jpg',
  previewImage: 'https://example.com/product-preview.jpg',
  price: 389.5,
  isNew: true,
  discount: false,
  oldPrice: 0,
};

beforeEach(() => {
  http.mockImplementation(({ url }) => {
    if (url === '/productos') {
      return Promise.resolve({
        data: {
          items: [sampleProduct],
          total: 1,
          page: 1,
          limit: 24,
          totalPages: 1,
        },
      });
    }

    if (url === '/productos/1') {
      return Promise.resolve({ data: sampleProduct });
    }

    return Promise.reject({ response: { status: 404 } });
  });
});

afterEach(() => {
  jest.clearAllMocks();
  window.history.pushState({}, '', '/');
});

test('renders the catalog route', async () => {
  window.history.pushState({}, '', '/productos');

  render(<App />);

  expect(await screen.findByText(sampleProduct.name)).toBeInTheDocument();
  expect(screen.getByText('1 resultados')).toBeInTheDocument();
});

test('renders product detail route', async () => {
  window.history.pushState({}, '', '/productos/1');

  render(<App />);

  expect(await screen.findByRole('heading', { name: sampleProduct.name })).toBeInTheDocument();
  expect(screen.getByText('Consultar por WhatsApp')).toBeInTheDocument();
});

test('renders not found route', () => {
  window.history.pushState({}, '', '/ruta-inexistente');

  render(<App />);

  expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
});
