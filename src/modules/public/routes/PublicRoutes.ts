import { Route } from "../models/RouteModel";
/* Paginas publicas da aplicação */
import LoginPage from "../modules/authentication/pages/Login";
import RegisterPage from "../modules/authentication/pages/Register";
import ResetPwPage from "../modules/authentication/pages/ResetPw";
import HomePage from "../pages/Home";

export const PUBLIC_ROUTES: Array<Route> = [
  {
    key: "sign-in",
    title: "Entrar",
    path: "sign-in",
    component: LoginPage,
  },
  {
    key: "sign-up",
    title: "Registrar-se",
    path: "sign-up",
    component: RegisterPage,
  },
  {
    key: "reset-pw",
    title: "Redefinir senha",
    path: "reset",
    component: ResetPwPage,
  },
  {
    key: "home",
    title: "Home",
    path: "home",
    component: HomePage,
  },
  {
    key: "base-path",
    title: "Home",
    path: "/",
    component: HomePage,
  },
];
