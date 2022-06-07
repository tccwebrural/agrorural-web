import { TextField } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { useAuth } from "../../../../../providers/AuthProvider";
import "../../../styles/Home.css";

import { useGlobalLoading } from "providers/GlobalLoadingProvider";

import toast from "react-hot-toast";

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
    loadingHelper.startLoading();
    auth.getUser().then(async (user?: UserModel) => {
      if (user) {
        const farmValues = await getFarmValues();
        farmValues?.name;
        if (farmValues) {
          user.farmName = farmValues?.name;
        }
        toast.success("Declare do rebanho carregado com sucesso!");
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
                sx={{ marginBottom: 0.4, width: "100%" }}
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
                sx={{ marginTop: 0.4, width: "50%" }}
                disabled={true}
              />
              <br />
              <TextField
                label="Telefone"
                {...getControls(formik, "phone")}
                size="small"
                variant="standard"
                sx={{ marginTop: 0.5, width: "50%" }}
                disabled={true}
              />
              <TextField
                label="Nome da Fazenda"
                {...getControls(formik, "farmName")}
                variant="standard"
                sx={{ marginTop: 0.1, width: "50%" }}
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
