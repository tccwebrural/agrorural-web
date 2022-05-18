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
  const [report, setReport] = useState<ReportModel>({
    rebanhoAtual: {
      bezerros: {
        male: 1,
        female: 10,
      },
      desmamados: { male: 10, female: 0 },
      garrotes: { male: 10, female: 10 },
      novilhos: { male: 10, female: 10 },
      outros: { male: 10, female: 10 },
      total: { male: 10, female: 10 },
    },
    rebanhoComCausas: {
      bezerros: {
        male: 1,
        female: 10,
      },
      desmamados: { male: 10, female: 0 },
      garrotes: { male: 10, female: 10 },
      novilhos: { male: 10, female: 10 },
      outros: { male: 10, female: 10 },
      total: { male: 10, female: 10 },
    },
  });

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
    const resultado = cattlehelpers.getAllCattles().then((cattles) => {
      const resultado = cattles
        .map((cattle) => ({
          ...cattle,
          age: getMonthFromDate(cattle.birthday),
        }))
        .reduce(
          (previousValues: any, currentValue: any) => {
            if (currentValue.sex === 1) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                previousValues.totalBezerros = previousValues.totalBezerros + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamados =
                  previousValues.totalDesmamados + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotes = previousValues.totalGarrotes + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhos = previousValues.totalNovilhos + 1;
              } else {
                previousValues.totalAcimaDe36 =
                  previousValues.totalAcimaDe36 + 1;
              }
            }

            if (currentValue.sex === 2) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                previousValues.totalBezerros = previousValues.totalBezerros + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamados =
                  previousValues.totalDesmamados + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotes = previousValues.totalGarrotes + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhos = previousValues.totalNovilhos + 1;
              } else {
                previousValues.totalAcimaDe36 =
                  previousValues.totalAcimaDe36 + 1;
              }
              currentReport.rebanhoAtual.bezerros.male =
                resultado.totalBezerrosM;
              currentReport.rebanhoAtual.bezerros.female =
                resultado.tempTotalBezerrosF;
              currentReport.rebanhoAtual.desmamados.male =
                resultado.tempTotalDesmamadosM;
              currentReport.rebanhoAtual.desmamados.female =
                resultado.tempTotalDesmamadosF;
              currentReport.rebanhoAtual.garrotes.male =
                resultado.tempTotalGarrotesM;
              currentReport.rebanhoAtual.garrotes.female =
                resultado.tempTotalGarrotesM;
              //...
              currentReport.rebanhoComCausas.bezerros.male =
                resultado.tempTotalBezerrosM;
              currentReport.rebanhoComCausas.bezerros.female =
                resultado.tempTotalBezerrosF;
              currentReport.rebanhoComCausas.desmamados.male =
                resultado.tempTotalDesmamadosM;
              currentReport.rebanhoComCausas.desmamados.female =
                resultado.tempTotalDesmamadosF;
              currentReport.rebanhoComCausas.garrotes.male =
                resultado.tempTotalGarrotesM;
              currentReport.rebanhoComCausas.garrotes.female =
                resultado.tempTotalGarrotesM;
            }

            return previousValues;
          },
          {
            totalBezerros: 0,
            totalDesmamados: 0,
            totalGarrotes: 0,
            totalNovilhos: 0,
            totalAcimaDe36: 0,
          }
        );
      return resultado;
    });
    const currentReport = report;

    //...
    setReport(currentReport);

    loadingHelper.stopLoading();
    console.log(currentReport);
  }, []);

  const reportHelper = ReportHelper();

  //   const [CattleCategory, setCattleCattegory] = useState<

  const navigate = useNavigate();

  const submitSave = async () => {
    await reportHelper
      .createReport(report)
      .then(() => {
        navigate("/private/home");
        let cancel = false;
        if (cancel) return;
        setReport(report);
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
      <Button type="submit" onClick={submitSave}>
        SALVAR
      </Button>
    </>
  );
};

export default ButtonReportDeclare;
