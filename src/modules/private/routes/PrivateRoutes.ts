import { Route } from "../../../models/RouteModel";
/* Paginas publicas da aplicação */
import CattleListPage from "../modules/cattles/pages/CattleList";
import CattleFormPage from "../modules/cattles/pages/CreateCattleForm";
import HomePage from "./../modules/home/pages/Home";
import ViewProfilePage from "./../modules/profiles/pages/ViewProfile";
import ProfileFormPage from "./../modules/profiles/pages/ProfileForm";
import UpdateCattleStatusModal from "../modules/cattles/components/UpdateCattleModal";
import UpdateCattleModal from "../modules/cattles/components/UpdateCattleModal";
import VaccineFormPage from "../modules/cattles/pages/VaccineForm";
import MyCattle from "../modules/cattles/pages/MyCattle";
import CreateCattleFormPage from "../modules/cattles/pages/CreateCattleForm";
import cattleViewVaccine from "../modules/cattles/pages/cattleViewVaccine";

export const PRIVATE_ROUTES: Array<Route> = [
  {
    key: "home",
    title: "Home",
    path: "home",
    showHeaderBtn: true,
    component: HomePage,
  },

  {
    key: "get-cattles",
    title: "Meu Gado",
    path: "cattles",
    showHeaderBtn: true,
    component: CattleListPage,
  },
  {
    key: "add-cattle",
    title: "Cadastrar Gado",
    path: "cattles/form",
    showHeaderBtn: false,
    component: CreateCattleFormPage,
  },
  {
    key: "update-cattle",
    title: "Editar Gado",
    path: "cattles/form/:id",
    showHeaderBtn: false,
    component: UpdateCattleModal,
  },

  {
    key: "vacine-form",
    title: "Cadastrar vacina",
    path: "cattles/:id/vacine/form",
    showHeaderBtn: false,
    component: VaccineFormPage,
  },

  {
    key: "my-profile",
    title: "Meu Perfil",
    path: "profile",
    showHeaderBtn: true,
    component: ViewProfilePage,
  },

  {
    key: "my-cattle",
    title: "Cartao de Vacina",
    path: "cattle/Vaccine",
    showHeaderBtn: false,
    component: MyCattle,
  },

  {
    key: "VaccineView",
    title: "detalhes Vacina ",
    path: "cattle/vaccine/view",
    showHeaderBtn: false,
    component: cattleViewVaccine,
  },
];
