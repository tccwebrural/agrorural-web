import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import PrivateLayout from "./components/PrivateLayout";
import HomePage from "./modules/home/pages/Home";
import { PRIVATE_ROUTES } from "./routes/PrivateRoutes";

/**
 * Componente responsável por controlar se deve exibir ou não o componente da rota;
 *
 * @param param0 - Página a ser redirizada caso o usuário esteja logado;
 * @returns Caso exista um usuário autenticado, é retornado o componente ou página,
 * caso contrário um {@link Navigate} para /home quando o usuário não está logado;
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate key="redirect-to-home" to="/home" replace />;
  }

  return children;
};

/**
 * Para cada rota definida em @see {@link PRIVATE_ROUTES}
 * transforma o objeto de rota em um componente de Rota.
 */
const getPrivateRoutes = (): React.ReactNode => {
  return PRIVATE_ROUTES.map((element) => (
    <Route
      key={element.key}
      path={element.path}
      element={
        <RequireAuth>
          <element.component />
        </RequireAuth>
      }
    />
  ));
};

const PrivateRoute = () => {
  return (
    <Route path="/private" element={<PrivateLayout />}>
      {getPrivateRoutes()}
      <Route index element={<HomePage />} />
    </Route>
  );
};

export default PrivateRoute;
