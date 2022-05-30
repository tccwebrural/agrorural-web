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
  Grid,
  Modal,
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
import { ReportCattle, ReportModel } from "../models/ReportModel";
import { Agent } from "https";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { CompressOutlined, PreviewOutlined } from "@mui/icons-material";
import {
  MALE,
  FEMALE,
  CATTLE_IS_LIVE,
  DEATH_BY_VARIOUS_CASES,
  DEATH_BY_OWN_CONSUMPTION,
} from "../../../../../constants";
import { FarmHelper } from "modules/private/helpers/FarmHelper";
import { PerfilModelUser, UserModel } from "modules/public/models/UserModel";
import { Formik } from "formik";
import { RegisterValidatorSchema } from "modules/public/modules/authentication/validators/RegisterValidatorSchema";
import { getControls } from "utils/FormUtils";
import { ReportHelper } from "../helpers/ReportHelper";
import { useNavigate } from "react-router-dom";
import { getFireError } from "utils/HandleFirebaseError";
import { Timestamp } from "firebase/firestore";

const CattleDeathComponent = (): ReactElement => {
  const loadingHelper = useGlobalLoading();

  const cattlehelpers = CattleHelper();

  const [report, setReport] = useState<ReportModel>({
    rebanhoAtual: {
      bezerros: {
        male: 0,
        female: 0,
      },
      desmamados: { male: 0, female: 0 },
      garrotes: { male: 0, female: 0 },
      novilhos: { male: 0, female: 0 },
      outros: { male: 0, female: 0 },
      total: { male: 0, female: 0 },
    },
    rebanhoComCausas: {
      bezerros: {
        male: 0,
        female: 0,
      },
      desmamados: { male: 0, female: 0 },
      garrotes: { male: 0, female: 0 },
      novilhos: { male: 0, female: 0 },
      outros: { male: 0, female: 0 },
      total: { male: 0, female: 0 },
    },
    createdAt: Timestamp.now(),
  });

  const getMonthFromDate = (date: string) => {
    var birthDay = new Date(date);
    var today = new Date();
    var birthDayYear = birthDay.getFullYear();
    var todayYear = today.getFullYear();
    var birthDayMonth = birthDay.getMonth();
    var todayMonth = today.getMonth();
    return todayMonth + 12 * todayYear - (birthDayMonth + 12 * birthDayYear);
  };

  useEffect(() => {
    loadingHelper.startLoading();
    cattlehelpers.getAllCattles().then((cattles) => {
      const resultado = cattles

        .map((cattle) => ({
          ...cattle,
          age: getMonthFromDate(cattle.birthday),
        }))
        .reduce(
          (previousValues: any, currentValue: any) => {
            const age = getMonthFromDate(currentValue.birthday);
            const initialValue = 0;
            if (
              currentValue.sex === MALE &&
              currentValue.deathBy === DEATH_BY_OWN_CONSUMPTION
            ) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                // previousValues.totalBezerrosM = currentValue.totalBezerrosM + 1;
                previousValues.totalBezerrosM =
                  previousValues.totalBezerrosM + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamadosM =
                  previousValues.totalDesmamadosM + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotesM =
                  previousValues.totalGarrotesM + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhosM =
                  previousValues.totalBezerrosM + 1;
              } else {
                previousValues.totalOutrosM = previousValues.totalOutrosM + 1;
              }
            } else if (
              currentValue.sex === FEMALE &&
              currentValue.deathBy === DEATH_BY_OWN_CONSUMPTION
            ) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                // previousValues.totalBezerrosM = currentValue.totalBezerrosM + 1;
                previousValues.totalBezerrosF =
                  previousValues.totalBezerrosF + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamadosF =
                  previousValues.totalDesmamadosF + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotesF =
                  previousValues.totalGarrotesF + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhosF =
                  previousValues.totalNovilhosF + 1;
              } else {
                previousValues.totalOutrosF = previousValues.totalOutrosF + 1;
              }
            }

            previousValues.totalCattlesMale =
              previousValues.totalOutrosM +
              previousValues.totalBezerrosM +
              previousValues.totalDesmamadosM +
              previousValues.totalGarrotesM +
              previousValues.totalNovilhosM;

            //TOTAL CATTLES FEMALE

            previousValues.totalCattlesFemale =
              previousValues.totalBezerrosF +
              previousValues.totalDesmamadosF +
              previousValues.totalGarrotesF +
              previousValues.totalNovilhosF +
              previousValues.totalOutrosF;
            //   *******************************TOTAL DEATH DIVERSOUS

            return previousValues;
          },
          {
            totalBezerrosM: 0,
            totalDesmamadosM: 0,
            totalGarrotesM: 0,
            totalNovilhosM: 0,
            totalOutrosM: 0,
            totalCattlesFemale: 0,
            totalCattlesMale: 0,
            totalBezerrosF: 0,
            totalDesmamadosF: 0,
            totalGarrotesF: 0,
            totalNovilhosF: 0,
            totalOutrosF: 0,

            // CAUSAS DE MORTES DIVERSAS
          }
        );

      //   REBANHO MORTOS

      currentReport.rebanhoComCausas.bezerros.male = resultado.totalBezerrosM;
      currentReport.rebanhoComCausas.bezerros.female = resultado.totalBezerrosF;
      currentReport.rebanhoComCausas.desmamados.male =
        resultado.totalDesmamadosM;
      currentReport.rebanhoComCausas.desmamados.female =
        resultado.totalDesmamadosF;
      currentReport.rebanhoComCausas.garrotes.male = resultado.totalGarrotesM;
      currentReport.rebanhoComCausas.garrotes.female = resultado.totalGarrotesF;
      currentReport.rebanhoComCausas.novilhos.male = resultado.totalNovilhosM;
      currentReport.rebanhoComCausas.novilhos.female = resultado.totalNovilhosF;
      currentReport.rebanhoComCausas.outros.male = resultado.totalOutrosM;
      currentReport.rebanhoComCausas.outros.female = resultado.totalOutrosF;
      currentReport.rebanhoComCausas.total.male = resultado.totalCattlesMale;
      currentReport.rebanhoComCausas.total.female =
        resultado.totalCattlesFemale;

      return resultado;
    });

    //...
    const currentReport = report;

    //   //...REBANHO COM CAUSAS

    setReport(currentReport);

    loadingHelper.stopLoading();
    console.log("reports" + report);
  }, []);

  return (
    <>
      <div>
        <p id="CurrentCattleHerd-Mortality">
          Mortalidade de Bovinos
          <br />
          (ainda não declarados)
        </p>
        <div className="CurrentCattleHerd">
          <div className="Block-CurrentCattleHerd">
            <p id="causes-txt">CAUSAS</p>
            <div id="causes">
              <p id="txt-ownConsumption">Consumo própio</p>
              <p id="txt-DeathVariousCauses">Obitos causas diversas</p>
            </div>
          </div>
          <div className="Block-CurrentCattleHerd">
            <p className="SmallBlocksMortality">Até 6 meses</p>
            <div className="MF">
              <p className="M-txt">Macho</p>
              <p className="F-txt">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left">
              {report.rebanhoComCausas.bezerros.male}
            </div>
            <div className="FieldMF-alt-Rigth">
              {report.rebanhoComCausas.bezerros.female}
            </div>
            <div className="FieldMF-Down-left"></div>
            <div className="FieldMF-Down-Rigth"></div>{" "}
          </div>
          <div className="Block-CurrentCattleHerd">
            <p className="SmallBlocksMortality">De 7 à 12 meses</p>
            <div className="MF">
              <p className="M-txt">Macho</p>
              <p className="F-txt">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left"></div>
            <div className="FieldMF-alt-Rigth"></div>
            <div className="FieldMF-Down-left"></div>
            <div className="FieldMF-Down-Rigth"></div>
          </div>
          <div className="Block-CurrentCattleHerd">
            <p className="SmallBlocksMortality">De 13 a 24 meses</p>
            <div className="MF">
              <p className="M-txt">Macho</p>
              <p className="F-txt">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left"></div>
            <div className="FieldMF-alt-Rigth"></div>
            <div className="FieldMF-Down-left"></div>
            <div className="FieldMF-Down-Rigth"></div>
          </div>
          <div className="Block-CurrentCattleHerd">
            <p className="SmallBlocksMortality">Mais de 24 meses</p>
            <div className="MF">
              <p className="M-txt">Macho</p>
              <p className="F-txt">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left"></div>
            <div className="FieldMF-alt-Rigth"></div>
            <div className="FieldMF-Down-left"></div>
            <div className="FieldMF-Down-Rigth"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CattleDeathComponent;
