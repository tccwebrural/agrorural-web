import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TableBody,
  Paper,
  Fab,
  Button,
  TextField,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { useAuth } from "../../../../../providers/AuthProvider";
import "../../../styles/Home.css";
import { BsPrinter } from "react-icons/bs";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import {
  CattleModel,
  CATTLE_SEXS,
  CATTLE_TYPES,
} from "../../cattles/models/CattleModel";
import toast from "react-hot-toast";
import { ReportModel, Report_cattle_cattegory } from "../models/ReportModel";
import { Agent } from "https";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { CompressOutlined } from "@mui/icons-material";
import { MALE, FEMALE } from "../../../../../constants";
import { FarmHelper } from "modules/private/helpers/FarmHelper";
import { PerfilModelUser, UserModel } from "modules/public/models/UserModel";
import { Formik } from "formik";
import { RegisterValidatorSchema } from "modules/public/modules/authentication/validators/RegisterValidatorSchema";
import { getControls } from "utils/FormUtils";
var today = new Date();
var currentYear = today.getFullYear();
var lastYear = today.getFullYear() - 1;
var twoYearsAgo = today.getFullYear() - 2;
var threeYearsAgo = today.getFullYear() - 3;
var fourYearsAgo = today.getFullYear() - 4;
var periodo = [currentYear, lastYear, twoYearsAgo, threeYearsAgo, fourYearsAgo];

const ProprietarieData = (): ReactElement => {
  const auth = useAuth();
  const { getFarmRef, getFarmValues } = FarmHelper();
  const [initialValues, setInitialValues] = useState<PerfilModelUser>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    farmName: "",
  });
  const loadingHelper = useGlobalLoading();

  useEffect(() => {
    auth.getUser().then(async (user?: UserModel) => {
      if (user) {
        const farmValues = await getFarmValues();
        farmValues?.name;
        if (farmValues) {
          user.farmName = farmValues?.name;
        }
        toast.success("Perfil carregado!");
        setInitialValues(user);
      } else {
        //TODO: Volta para listagem
        toast.error("Erro ao carregar  credenciais");
      }
      loadingHelper.stopLoading();
    });
  }, []);

  const submitForm = () => {};

  return (
    <>
      <div>
        <p className="CattleDeclaration">Dados do Proprietário</p>{" "}
        {/* declare do gado */}
        <Formik
          enableReinitialize={true}
          onSubmit={submitForm}
          validationSchema={RegisterValidatorSchema}
          initialValues={initialValues}
        >
          {(formik) => (
            <div id="OwnerData">
              {" "}
              {/* dados do proprietario */}
              <TextField
                label="Nome do Proprietário"
                variant="standard"
                {...getControls(formik, "name")}
                sx={{ width: "100%" }}
                disabled={true}
              />
              <TextField
                label="E-mail"
                variant="standard"
                {...getControls(formik, "email")}
                sx={{ width: "50%" }}
                disabled={true}
              />
              <TextField
                label="CPF"
                {...getControls(formik, "cpf")}
                size="small"
                variant="standard"
                sx={{ marginTop: 0.3, width: "50%" }}
                disabled={true}
              />
              <br />
              <TextField
                label="Telefone"
                {...getControls(formik, "phone")}
                size="small"
                variant="standard"
                sx={{ marginTop: 0.3, width: "50%" }}
                disabled={true}
              />
              <TextField
                label="Nome da Fazenda"
                {...getControls(formik, "farmName")}
                variant="standard"
                sx={{ width: "50%" }}
                disabled={true}
              />
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProprietarieData;
