import { BreadCrumb } from "primereact/breadcrumb";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routesConfig } from "../../RoutesConfig";
import "./Breadcrumb.css";

export default function AppBreadcrumb({ getProductName }) {
  const location = useLocation();
  const navigate = useNavigate();

  //matchRoutes requiere objetos { path, ... }
  const routeObjects = routesConfig.map(r => ({
    path: r.path,
    crumb: r.crumb,
  }));

  const matches = matchRoutes(routeObjects, location);

  if (!matches || location.pathname === "/") return null;

  const crumbs = matches
    .map(m => m.route.crumb?.({ params: m.params, getProductName, pathname: m.pathname }))
    .filter(Boolean)

  const home = { icon: "pi pi-home", command: () => navigate("/") };

  const model = crumbs.map((c, i) => 
    i === crumbs.length - 1 || !c.to 
      ? { label: c.label } 
      : { label: c.label, command: () => navigate(c.to) }
  );
  
  return (
    <div className="breadcrumb-wrapper">
      <BreadCrumb model={model} home={home} />
    </div>
  );
}
