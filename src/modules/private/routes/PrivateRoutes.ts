import { Route } from "../../public/models/RouteModel";
/* Paginas publicas da aplicação */
import CattleInfoGado from "../modules/cattles/pages/CattleInfo";
import CattleListPage from "../modules/cattles/pages/CattleList";
import CreateCattleFormPage from "../modules/cattles/pages/CreateCattleForm";
import MyCattle from "../modules/cattles/pages/MyCattle";
import UpdateCattle from "../modules/cattles/pages/UpdateCattle";
import VaccineNotify from "../modules/notifications/pages/VaccineNotify";
import DeclareForm from "../modules/reports/pages/DeclareCattle";
import CattleEditVaccine from "../modules/vacine/pages/CattleEditVaccine";
import CattleViewVaccine from "../modules/vacine/pages/CattleViewVaccine";
import VaccineFormPage from "../modules/vacine/pages/VaccineForm";
import HomePage from "./../modules/home/pages/Home";
import ViewProfilePage from "./../modules/profiles/pages/ViewProfile";
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
    title: "Minha Criação",
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
    component: UpdateCattle,
  },

  {
    key: "vacine-form",
    title: "Cadastrar vacina",
    path: "cattles/:id/vacine/form",
    showHeaderBtn: false,

    component: VaccineFormPage,
  },
  {
    key: "Declare form",
    title: "Declare do Rebanho",
    path: "cattle/DeclareForm",
    showHeaderBtn: true,
    component: DeclareForm,
  },

  {
    key: "Notify Vaccine",
    title: "Notificações",
    path: "cattle/NotifyVaccine",
    showHeaderBtn: false,
    component: VaccineNotify,
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
    path: "cattle/:id/Vaccine",
    showHeaderBtn: false,
    component: MyCattle,
  },

  {
    key: "VaccineView",
    title: "detalhes Vacina ",
    path: "cattle/:id/vaccine/:idVacine/view",
    showHeaderBtn: false,
    component: CattleViewVaccine,
  },

  {
    key: "infoGado",
    title: "Informações do Gado ",
    path: "cattle/:id/infoGado",
    showHeaderBtn: false,
    component: CattleInfoGado,
  },
  {
    key: "CattleEditVaccine",
    title: "Editar Vacina",
    // path: "cattles/CattleEditVaccine:id",
    path: "cattle/:id/vacine/:idVacine/edit",
    showHeaderBtn: false,
    component: CattleEditVaccine,
  },
];
