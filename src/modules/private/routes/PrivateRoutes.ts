import { Route } from "../../../models/RouteModel";
/* Paginas publicas da aplicação */
import CattleListPage from "../modules/cattles/pages/CattleList";
import CattleFormPage from "./../modules/cattles/pages/CattleForm";
import HomePage from "./../modules/home/pages/Home";
import ViewProfilePage from "./../modules/profiles/pages/ViewProfile";
import ProfileFormPage from "./../modules/profiles/pages/ProfileForm";
import UpdateCattleStatusModal from "../modules/cattles/components/UpdateCattleStatusModal";

export const PRIVATE_ROUTES: Array<Route> = [
  {
    key: "home",
    title: "Tela inicial",
    path: "home",
    component: HomePage,
  },
  /* ROTAS DO CONTROLE DO GADO */
  {
    key: "get-cattles",
    title: "Meu Gado",
    path: "cattles",
    component: CattleListPage,
  },
  {
    key: "add-cattle",
    title: "Cadastrar Gado",
    path: "cattles/form",
    component: CattleFormPage,
  },
  // {
  //   key: "update-cattle",
  //   title: "Editar Gado",
  //   path: "cattles/form/:id",
  //   component: UpdateCattleStatusModal,
  // },
  // {
  //   key: "get-cattle",
  //   title: "Visualizar informações do Gado",
  //   path: "cattles/form/:id?onlyView=true",
  //   component: CattleFormPage,
  // },
  // /* ROTAS DO CONTROLE DE VACINA POR GADO */
  // {
  //   key: "create-vaccine-to-cattle",
  //   title: "Adicionar vacina aplicada no gado",
  //   path: "cattles/:id/vaccines/form",
  //   component: CattleFormPage,
  // },
  // {
  //   key: "get-all-vaccine-to-cattle",
  //   title: "Cartão de Vacina do gado",
  //   path: "cattles/:id/vaccines",
  //   component: CattleFormPage,
  // },
  // /* ROTAS DO MEU PERFIL ATUAL */
  // {
  //   key: "my-profile",
  //   title: "Meu Perfil",
  //   path: "profile",
  //   component: ViewProfilePage,
  // },
  // {
  //   key: "update-my-profile",
  //   title: "Atualizar dados do meu Perfil",
  //   path: "profile/:id",
  //   component: ProfileFormPage,
  // },
];
