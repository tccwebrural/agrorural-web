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
import { ReportModel } from "../models/ReportModel";
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
    deathByDiversousCases: {
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
    deathByOwnConsuption: {
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
            if (currentValue.sex === MALE && currentValue.deathBy === 1) {
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
              currentValue.deathBy === 1
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

            // SEGUNDO IF*************************************************************************
            if (currentValue.sex === MALE && currentValue.deathBy === 2) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                // previousValues.totalBezerrosM = currentValue.totalBezerrosM + 1;
                previousValues.totalBezerrosConsumoProprioM =
                  previousValues.totalBezerrosConsumoProprioM + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamadosConsumoProprioM =
                  previousValues.totalDesmamadosConsumoProprioM + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotesConsumoProprioM =
                  previousValues.totalGarrotesConsumoProprioM + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhosConsumoProprioM =
                  previousValues.totalBezerrosConsumoProprioM + 1;
              } else {
                previousValues.totalOutrosConsumoProprioM =
                  previousValues.totalOutrosConsumoProprioM + 1;
              }
            } else if (
              currentValue.sex === FEMALE &&
              currentValue.deathBy === 2
            ) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                // previousValues.totalBezerrosM = currentValue.totalBezerrosM + 1;
                previousValues.totalBezerrosConsumoProprioF =
                  previousValues.totalBezerrosConsumoProprioF + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamadosConsumoProprioF =
                  previousValues.totalDesmamadosConsumoProprioF + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotesConsumoProprioF =
                  previousValues.totalGarrotesConsumoProprioF + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhosConsumoProprioF =
                  previousValues.totalNovilhosConsumoProprioF + 1;
              } else {
                previousValues.totalOutrosConsumoProprioF =
                  previousValues.totalOutrosConsumoProprioF + 1;
              }
            }

            // **********_)___________________________*********************

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

            // CONSUMO PROPRIO*********
            previousValues.totalCattlesConsumoProprioMale =
              previousValues.totalOutrosConsumoProprioM +
              previousValues.totalBezerrosConsumoProprioM +
              previousValues.totalDesmamadosConsumoProprioM +
              previousValues.totalGarrotesConsumoProprioM +
              previousValues.totalNovilhosConsumoProprioM;

            previousValues.totalCattlesConsumoProprioFemale =
              previousValues.totalBezerrosConsumoProprioF +
              previousValues.totalDesmamadosConsumoProprioF +
              previousValues.totalGarrotesConsumoProprioF +
              previousValues.totalNovilhosConsumoProprioF +
              previousValues.totalOutrosConsumoProprioF;

            // FIM

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

            // CONSUMO PRPRIO
            totalBezerrosConsumoProprioM: 0,
            totalDesmamadosConsumoProprioM: 0,
            totalGarrotesConsumoProprioM: 0,
            totalNovilhosConsumoProprioM: 0,
            totalOutrosConsumoProprioM: 0,
            totalCattlesConsumoProprioFemale: 0,
            totalCattlesConsumoProprioMale: 0,
            totalBezerrosConsumoProprioF: 0,
            totalDesmamadosConsumoProprioF: 0,
            totalGarrotesConsumoProprioF: 0,
            totalNovilhosConsumoProprioF: 0,
            totalOutrosConsumoProprioF: 0,
          }
        );
      currentReport.deathByDiversousCases.bezerros.male =
        resultado.totalBezerrosM;
      currentReport.deathByDiversousCases.bezerros.female =
        resultado.totalBezerrosF;
      currentReport.deathByDiversousCases.desmamados.male =
        resultado.totalDesmamadosM;
      currentReport.deathByDiversousCases.desmamados.female =
        resultado.totalDesmamadosF;
      currentReport.deathByDiversousCases.garrotes.male =
        resultado.totalGarrotesM;
      currentReport.deathByDiversousCases.garrotes.female =
        resultado.totalGarrotesF;
      currentReport.deathByDiversousCases.novilhos.male =
        resultado.totalNovilhosM;
      currentReport.deathByDiversousCases.novilhos.female =
        resultado.totalNovilhosF;
      currentReport.deathByDiversousCases.outros.male = resultado.totalOutrosM;
      currentReport.deathByDiversousCases.outros.female =
        resultado.totalOutrosF;
      currentReport.deathByDiversousCases.total.male =
        resultado.totalCattlesMale;
      currentReport.deathByDiversousCases.total.female =
        resultado.totalCattlesFemale;

      // CONSUMO PROPRIO

      currentReport.deathByOwnConsuption.bezerros.male =
        resultado.totalBezerrosConsumoProprioM;
      currentReport.deathByOwnConsuption.bezerros.female =
        resultado.totalBezerrosConsumoProprioF;
      currentReport.deathByOwnConsuption.desmamados.male =
        resultado.totalDesmamadosConsumoProprioM;
      currentReport.deathByOwnConsuption.desmamados.female =
        resultado.totalDesmamadosConsumoProprioF;
      currentReport.deathByOwnConsuption.garrotes.male =
        resultado.totalGarrotesConsumoProprioM;
      currentReport.deathByOwnConsuption.garrotes.female =
        resultado.totalGarrotesConsumoProprioF;
      currentReport.deathByOwnConsuption.novilhos.male =
        resultado.totalNovilhosConsumoProprioM;
      currentReport.deathByOwnConsuption.novilhos.female =
        resultado.totalNovilhosConsumoProprioF;
      currentReport.deathByOwnConsuption.outros.male =
        resultado.totalOutrosConsumoProprioM;
      currentReport.deathByOwnConsuption.outros.female =
        resultado.totalOutrosConsumoProprioF;
      currentReport.deathByOwnConsuption.total.male =
        resultado.totalCattlesConsumoProprioMale;
      currentReport.deathByOwnConsuption.total.female =
        resultado.totalCattlesConsumoProprioFemale;
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
              <p id="txt-ownConsumption">Consumo próprio</p>
              <p id="txt-DeathVariousCauses">Óbitos causas diversas</p>
            </div>
          </div>
          <div className="Block-CurrentCattleHerd">
            <p className="SmallBlocksMortality">Até 6 meses</p>
            <div className="MF">
              <p className="M-txt">Macho</p>
              <p className="F-txt">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left">
              {report.deathByOwnConsuption.bezerros.male}
            </div>
            <div className="FieldMF-alt-Rigth">
              {" "}
              {report.deathByOwnConsuption.bezerros.female}
            </div>
            <div className="FieldMF-Down-left">
              {" "}
              {report.deathByDiversousCases.bezerros.male}
            </div>
            <div className="FieldMF-Down-Rigth">
              {report.deathByDiversousCases.bezerros.female}
            </div>{" "}
          </div>
          <div className="Block-CurrentCattleHerd">
            <p className="SmallBlocksMortality">De 7 à 12 meses</p>
            <div className="MF">
              <p className="M-txt">Macho</p>
              <p className="F-txt">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left">
              {report.deathByOwnConsuption.desmamados.male}
            </div>
            <div className="FieldMF-alt-Rigth">
              {" "}
              {report.deathByOwnConsuption.desmamados.female}{" "}
            </div>
            <div className="FieldMF-Down-left">
              {report.deathByDiversousCases.desmamados.male}{" "}
            </div>
            <div className="FieldMF-Down-Rigth">
              {report.deathByDiversousCases.desmamados.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd">
            <p className="SmallBlocksMortality">De 13 a 24 meses</p>
            <div className="MF">
              <p className="M-txt">Macho</p>
              <p className="F-txt">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left">
              {" "}
              {report.deathByOwnConsuption.garrotes.male}
            </div>
            <div className="FieldMF-alt-Rigth">
              {" "}
              {report.deathByOwnConsuption.garrotes.female}
            </div>
            <div className="FieldMF-Down-left">
              {report.deathByDiversousCases.garrotes.male}
            </div>
            <div className="FieldMF-Down-Rigth">
              {report.deathByDiversousCases.garrotes.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd">
            <p className="SmallBlocksMortality">Mais de 24 meses</p>
            <div className="MF">
              <p className="M-txt">Macho</p>
              <p className="F-txt">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left">
              {" "}
              {report.deathByOwnConsuption.outros.male}
            </div>
            <div className="FieldMF-alt-Rigth">
              {" "}
              {report.deathByOwnConsuption.outros.female}
            </div>
            <div className="FieldMF-Down-left">
              {" "}
              {report.deathByDiversousCases.outros.male}
            </div>
            <div className="FieldMF-Down-Rigth">
              {" "}
              {report.deathByDiversousCases.outros.female}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CattleDeathComponent;
