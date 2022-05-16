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
import { ReportCattleCategory, ReportModel } from "../models/ReportModel";
import { Agent } from "https";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { CompressOutlined } from "@mui/icons-material";
import { MALE, FEMALE } from "../../../../../constants";
import { FarmHelper } from "modules/private/helpers/FarmHelper";
import { PerfilModelUser, UserModel } from "modules/public/models/UserModel";
import { Formik } from "formik";
import { RegisterValidatorSchema } from "modules/public/modules/authentication/validators/RegisterValidatorSchema";
import { getControls } from "utils/FormUtils";
import { ReportHelper } from "../helpers/ReportHelper";
import { useNavigate } from "react-router-dom";
import { getFireError } from "utils/HandleFirebaseError";
var today = new Date();
var currentYear = today.getFullYear();
var lastYear = today.getFullYear() - 1;
var twoYearsAgo = today.getFullYear() - 2;
var threeYearsAgo = today.getFullYear() - 3;
var fourYearsAgo = today.getFullYear() - 4;
var periodo = [currentYear, lastYear, twoYearsAgo, threeYearsAgo, fourYearsAgo];

const ButtonReportDeclare = (): ReactElement => {
  const auth = useAuth();
  const loadingHelper = useGlobalLoading();

  const cattlehelpers = CattleHelper();
  var [totalBezerrosM, setTotalBezerrosM] = useState(0);
  var [totalDesmamadosM, setTotalDesmamadosM] = useState(0);
  var [totalGarrotesM, setTotalGarrotesM] = useState(0);
  var [totalNovilhosM, setTotalNovilhosM] = useState(0);
  var [totalAcimaDe36M, setTotalAcimaDe36M] = useState(0);
  var [totalDeAnimaisM, setTotalDeAnimaisM] = useState(0);

  var [totalBezerrosF, setTotalBezerrosF] = useState(0);
  var [totalDesmamadosF, setTotalDesmamadosF] = useState(0);
  var [totalGarrotesF, setTotalGarrotesF] = useState(0);
  var [totalNovilhosF, setTotalNovilhosF] = useState(0);
  var [totalAcimaDe36F, setTotalAcimaDe36F] = useState(0);
  var [totalDeAnimaisF, setTotalDeAnimaisF] = useState(0);
  const [cattlesCattegory, setCattlesCattegory] =
    useState<ReportCattleCategory>({
      bezerros: {
        macho: totalBezerrosM,
        femea: totalBezerrosF,
      },
      desmamados: { macho: totalDesmamadosM, femea: totalDesmamadosF },
      garrotes: { macho: totalGarrotesM, femea: totalGarrotesF },
      novilhos: { macho: totalNovilhosF, femea: totalNovilhosF },
      outros: { macho: totalAcimaDe36M, femea: totalAcimaDe36F },
      total: { macho: totalDeAnimaisM, femea: totalDeAnimaisF },
    });

  const [initialValues, setInitialValues] = useState<ReportModel>({
    rebanhoAtual: cattlesCattegory,
    rebanhoComCausas: cattlesCattegory,
  });

  const getSexFromCattle = () => {
    const getMonthFromDate = (date: string) => {
      var today = new Date();
      const dataSeparada = date.split("-");
      const ano = parseInt(dataSeparada[0]);
      const mes = parseInt(dataSeparada[1]);
      const dia = parseInt(dataSeparada[2]);

      var birthDate = new Date(ano, mes, dia);

      var months;
      months = (today.getFullYear() - birthDate.getFullYear()) * 12;
      months -= birthDate.getMonth() + 1;
      months += today.getMonth();

      return months <= 0 ? 0 : months;
    };

    useEffect(() => {
      loadingHelper.startLoading();
      cattlehelpers
        .getAllCattles()
        .then((cattles) => {
          let tempTotalBezerrosM = 0;
          let tempTotalDesmamadosM = 0;
          let tempTotalGarrotesM = 0;
          let tempTotalNovilhosM = 0;
          let tempTotalAcimaDe36M = 0;

          let tempTotalBezerrosF = 0;
          let tempTotalDesmamadosF = 0;
          let tempTotalGarrotesF = 0;
          let tempTotalNovilhosF = 0;
          let tempTotalAcimaDe36F = 0;

          for (let index = 0; index < cattles.length; index++) {
            const cattle = {
              ...cattles[index],
              age: getMonthFromDate(cattles[index].birthday),
            };

            if (cattle.sex === 1) {
              if (cattle.age >= 0 && cattle.age <= 6) {
                tempTotalBezerrosM++;
              } else if (cattle.age > 6 && cattle.age <= 12) {
                tempTotalDesmamadosM++;
              } else if (cattle.age > 12 && cattle.age <= 24) {
                tempTotalGarrotesM++;
              } else if (cattle.age > 24 && cattle.age <= 36) {
                tempTotalNovilhosM++;
              } else {
                tempTotalAcimaDe36M++;
              }
            } else {
              if (cattle.age >= 0 && cattle.age <= 6) {
                tempTotalBezerrosF++;
              } else if (cattle.age > 6 && cattle.age <= 12) {
                tempTotalDesmamadosF++;
              } else if (cattle.age > 12 && cattle.age <= 24) {
                tempTotalGarrotesF++;
              } else if (cattle.age > 24 && cattle.age <= 36) {
                tempTotalNovilhosF++;
              } else {
                tempTotalAcimaDe36F++;
              }
            }
          }
          setTotalBezerrosM(tempTotalBezerrosM);
          setTotalDesmamadosM(tempTotalDesmamadosM);
          setTotalGarrotesM(tempTotalGarrotesM);
          setTotalNovilhosM(tempTotalNovilhosM);
          setTotalAcimaDe36M(tempTotalAcimaDe36M);
          setTotalDeAnimaisM(
            tempTotalBezerrosM +
              tempTotalDesmamadosM +
              tempTotalGarrotesM +
              tempTotalNovilhosM +
              tempTotalAcimaDe36M
          );

          setTotalBezerrosF(tempTotalBezerrosF);
          setTotalDesmamadosF(tempTotalDesmamadosF);
          setTotalGarrotesF(tempTotalGarrotesF);
          setTotalNovilhosF(tempTotalNovilhosF);
          setTotalAcimaDe36F(tempTotalAcimaDe36F);
          setTotalDeAnimaisF(
            tempTotalBezerrosF +
              tempTotalDesmamadosF +
              tempTotalGarrotesF +
              tempTotalNovilhosF +
              tempTotalAcimaDe36F
          );

          loadingHelper.stopLoading();
          console.log(cattles);
        })
        .catch((err: any) => {
          toast.error(err);
          loadingHelper.stopLoading();
        });
    }, []);
  };

  const reportHelper = ReportHelper();

  //   const [CattleCategory, setCattleCattegory] = useState<

  const navigate = useNavigate();

  const submitSave = async (reports: ReportModel) => {
    reportHelper
      .createReport(reports)
      .then(() => {
        navigate("/private/home");

        setInitialValues(initialValues);
      })
      .catch((err) => {
        //TODO: Mensagem de erro
        //toast erro
        navigate("/private/cattles");

        console.error(err);
        toast.error(getFireError(err));
      });

    // vacine.id = id;
  };

  return (
    <>
      <Formik onSubmit={submitSave} initialValues={initialValues}>
        {(formik) => (
          <form id="Block-EditAnimalData" onSubmit={formik.handleSubmit}>
            <Button type="submit">SALVAR</Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ButtonReportDeclare;
