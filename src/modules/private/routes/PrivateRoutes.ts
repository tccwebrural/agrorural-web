import { Route } from "../../public/models/RouteModel";
/* Paginas publicas da aplicação */
import CattleListPage from "../modules/cattles/pages/CattleList";
import CattleFormPage from "../modules/cattles/pages/CreateCattleForm";
import HomePage from "./../modules/home/pages/Home";
import ViewProfilePage from "./../modules/profiles/pages/ViewProfile";
import ProfileFormPage from "./../modules/profiles/pages/ProfileForm";
import UpdateCattleStatusModal from "../modules/cattles/components/UpdateCattleModal";
import UpdateCattleModal from "../modules/cattles/components/UpdateCattleModal";
import MyCattle from "../modules/cattles/pages/MyCattle";
import CreateCattleFormPage from "../modules/cattles/pages/CreateCattleForm";
import cattleViewVaccine from "../modules/vacine/pages/cattleViewVaccine";
import CattleInfoGado from "../modules/cattles/pages/cattleInfoGado";
import VaccineFormPage from "../modules/vacine/pages/VaccineForm";
import notifyVaccine from "../modules/notifications/pages/NotifyVaccine";
import UpdateCattle from "../modules/cattles/pages/UpdateCattle";
import DeclareForm from "../modules/reports/pages/DeclareForm";
import TesteFormik from "../modules/testes/TesteFormik";
import CattleEditVaccine from "../modules/vacine/pages/CattleEditVaccine";
import VaccineFormPagetst from "../modules/vacine/pages/Vacineformtst";
import ReportPage from "../modules/reports/pages/ReportPage";
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
    key: "REPORT TS",
    title: "REPORTTST",
    path: "cattle/Reporttst",
    showHeaderBtn: true,
    component: ReportPage,
  },
  {
    key: "Notify Vaccine",
    title: "Notificações",
    path: "cattle/NotifyVaccine",
    showHeaderBtn: true,
    component: notifyVaccine,
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
    component: cattleViewVaccine,
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
  /////////////////////////  TESTE  /////////////////////////////////
  {
    key: "TesteFormik",
    title: "teste formik",
    path: "teste/TesteFormik",
    showHeaderBtn: false,
    component: TesteFormik,
  },
];
