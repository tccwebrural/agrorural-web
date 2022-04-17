import React from "react";
import { Route } from "react-router-dom";
import { PUBLIC_ROUTES } from "./routes/PublicRoutes";

const PublicRoute = () => {
  return PUBLIC_ROUTES.map((element) => (
    <Route
      key={element.key}
      path={element.path}
      element={<element.component />}
    />
  ));
};

export default PublicRoute;
