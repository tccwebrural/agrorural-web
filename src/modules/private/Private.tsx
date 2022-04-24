// import { auth } from "configs/Firebase";
// import React, { useEffect, useState } from "react";
// import {
//   IndexRouteProps,
//   LayoutRouteProps,
//   Navigate,
//   PathRouteProps,
//   Route,
// } from "react-router-dom";
// import { useAuth } from "../../providers/AuthProvider";
// import PrivateLayout from "./components/PrivateLayout";
// import HomePage from "./modules/home/pages/Home";
// import { PRIVATE_ROUTES } from "./routes/PrivateRoutes";

// /**
//  * Componente responsável por controlar se deve exibir ou não o componente da rota;
//  *
//  * @param param0 - Página a ser redirizada caso o usuário esteja logado;
//  * @returns Caso exista um usuário autenticado, é retornado o componente ou página,
//  * caso contrário um {@link Navigate} para /home quando o usuário não está logado;
//  */
// // const RequireAuth = ({ children }: { children: JSX.Element }) => {
// //   const [isLoggedIn, setIsLoggedIn] = useState<any>(undefined);

// //   useEffect(() => {
// //     const unsubscribe = auth.onAuthStateChanged((user) => {
// //       if (user) {
// //         setIsLoggedIn(true);
// //       } else {
// //         setIsLoggedIn(false);
// //       }
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   return isLoggedIn === null ? (
// //     <div>Some kind of loader/spinner here...</div>
// //   ) : isLoggedIn === false ? (
// //     <Navigate key="redirect-to-home" to="/sign-in" replace />
// //   ) : (
// //     children
// //   );
// // };

// const RequireAuth = ({ children }: { children: JSX.Element }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<any>(undefined);
//   const authHelper = useAuth();

//   useEffect(() => {
//     const asyncCallback = async () => {
//       const user = await authHelper.getUser();
//       if (user && user.active) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }

//       asyncCallback();
//     };
//   }, []);
//   return isLoggedIn === null ? (
//     <></>
//   ) : isLoggedIn === false ? (
//     <Navigate key="redirect-to-home" to="/sign-in" replace />
//   ) : (
//     children
//   );
// };

// /**
//  * Para cada rota definida em @see {@link PRIVATE_ROUTES}
//  * transforma o objeto de rota em um componente de Rota.
//  */

// const getPrivateRoutes = (): React.ReactNode => {
//   return PRIVATE_ROUTES.map((element) => (
//     <Route
//       key={element.key}
//       path={element.path}
//       element={
//         <RequireAuth>
//           <element.component />
//         </RequireAuth>
//       }
//     />
//   ));
// };

// const PrivateRoute = () => {
//   return (
//     <Route path="/private" element={<PrivateLayout />}>
//       {getPrivateRoutes()}
//       <Route
//         index
//         element={
//           <RequireAuth>
//             <HomePage />
//           </RequireAuth>
//         }
//       />
//     </Route>
//   );
// };

// export default PrivateRoute;

// CODIGO DO WESLEY
import { auth } from "configs/Firebase";
import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import PrivateLayout from "./components/PrivateLayout";
import HomePage from "./modules/home/pages/Home";
import { PRIVATE_ROUTES } from "./routes/PrivateRoutes";
import { useAuth } from "providers/AuthProvider";

/**
 * Componente responsável por controlar se deve exibir ou não o componente da rota;
 *
 * @param param0 - Página a ser redirizada caso o usuário esteja logado;
 * @returns Caso exista um usuário autenticado, é retornado o componente ou página,
 * caso contrário um {@link Navigate} para /home quando o usuário não está logado;
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(undefined);
  const authHelper = useAuth();

  useEffect(() => {
    const asyncCallback = async () => {
      const user = await authHelper.getUser();
      if (user && user.active) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      asyncCallback();
    };
  }, []);

  return isLoggedIn === null ? (
    <></>
  ) : isLoggedIn === false ? (
    <Navigate key="redirect-to-home" to="/sign-in" replace />
  ) : (
    children
  );
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
      <Route
        index
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
    </Route>
  );
};

export default PrivateRoute;
