import { RootRoute, Router, Route } from "@tanstack/react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import ExportProducts from "./pages/ExportProducts";
import ImportProducts from "./pages/ImportProducts";
import Facility from "./pages/Facility";
import Contact from "./pages/Contact";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const exportProductsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/export-products",
  component: ExportProducts,
});

const importProductsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/import-products",
  component: ImportProducts,
});

const facilityRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/facility",
  component: Facility,
});

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  exportProductsRoute,
  importProductsRoute,
  facilityRoute,
  contactRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
