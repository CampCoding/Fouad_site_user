import { Route, Routes as RouterRoutes } from "react-router";
import Layout from "../layouts/Layout";
import { routesData } from "./routesData";

export default function AppRoutes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Layout />}>
        {routesData.map((route) =>
          route.index ? (
            <Route key={route.id} index element={route.element} />
          ) : (
            <Route key={route.id} path={route.path} element={route.element} />
          ),
        )}
      </Route>
    </RouterRoutes>
  );
}
