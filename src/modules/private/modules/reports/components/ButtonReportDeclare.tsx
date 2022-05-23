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
import { CompressOutlined, PreviewOutlined } from "@mui/icons-material";
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

  const [cattleModelk, SetCattle] = useState<CattleModel>();
  const initialValues = 0;

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
            if (currentValue.sex === MALE) {
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
              } else if (currentValue.age > 36) {
                previousValues.totalOutrosM = previousValues.totalOutrosM + 1;
              }
            } else {
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
                  previousValues.totalBezerrosF + 1;
              } else {
                previousValues.totalOutrosF = previousValues.totalOutrosF + 1;
              }
              previousValues.totalCattlesMale =
                previousValues.totalBezerrosM + 1;
              previousValues.totalDesmamadosM + 1;
              previousValues.totalGarrotesM + 1;
              previousValues.totalNovilhosM + 1;
              previousValues.totalOutrosM + 1;

              previousValues.totalCattlesFemale =
                previousValues.totalBezerrosF + 1;
              previousValues.totalDesmamadosF + 1;
              previousValues.totalGarrotesF + 1;
              previousValues.totalNovilhosF + 1;
              previousValues.totalOutrosF + 1;
            }
            const animals = cattleModelk;

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
          }
        );
      currentReport.rebanhoAtual.bezerros.male = resultado.totalBezerrosM;
      currentReport.rebanhoAtual.bezerros.female = resultado.totalBezerrosF;
      currentReport.rebanhoAtual.desmamados.male = resultado.totalDesmamadosM;
      currentReport.rebanhoAtual.desmamados.female = resultado.totalDesmamadosF;
      currentReport.rebanhoAtual.garrotes.male = resultado.totalGarrotesM;
      currentReport.rebanhoAtual.garrotes.female = resultado.totalGarrotesF;
      currentReport.rebanhoAtual.novilhos.male = resultado.totalNovilhosM;
      currentReport.rebanhoAtual.novilhos.female = resultado.totalNovilhosF;
      currentReport.rebanhoAtual.outros.male = resultado.totalOutrosM;
      currentReport.rebanhoAtual.outros.female = resultado.totalOutrosF;
      currentReport.rebanhoAtual.total.male = resultado.totalCattlesMale;
      currentReport.rebanhoAtual.total.female = resultado.totalCattlesFemale;
      return resultado;
    });

    //...
    const currentReport = report;

    //   //...REBANHO COM CAUSAS
    currentReport.rebanhoComCausas.bezerros.male = 100;
    currentReport.rebanhoComCausas.bezerros.female = 100;
    currentReport.rebanhoComCausas.desmamados.male = 30;
    currentReport.rebanhoComCausas.desmamados.female = 3;
    currentReport.rebanhoComCausas.garrotes.male = 1;
    currentReport.rebanhoComCausas.garrotes.female = 5;
    currentReport.rebanhoComCausas.novilhos.male = 1;
    currentReport.rebanhoComCausas.novilhos.female = 12;
    currentReport.rebanhoComCausas.outros.male = 1;
    currentReport.rebanhoComCausas.outros.female = 10;
    setReport(currentReport);

    loadingHelper.stopLoading();
    console.log("reports" + report);
  }, []);

  const reportHelper = ReportHelper();

  //   const [CattleCategory, setCattleCattegory] = useState<

  const navigate = useNavigate();

  const submitSave = async () => {
    await reportHelper
      .createReport(report)
      .then(() => {
        // navigate("/private/home");
        // let cancel = false;
        // if (cancel) return;
        // setReport(currentrep);
        toast.success("SUCESSO");
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
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button type="submit" onClick={submitSave}>
        SALVAR
      </Button>

      <div>
        <p className="CattleDeclaration">Rebanho Bovino Atual Existente</p>
        <div className="CurrentCattleHerd-RA">
          {" "}
          {/*rebanho bovino atual */}
          <div className="Block-CurrentCattleHerd-RA">
            {" "}
            {/*bloco rebanho bovino atual */}
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              {" "}
              {/*blocos pequenos do rebanho bovino atual existente*/}
              Bezerros
              <br />
              (de 0 à 6 meses)
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.bezerros.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.bezerros.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              Desmamados
              <br />
              (de 7 à 12 meses)
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.desmamados.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.desmamados.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              Garrotes
              <br />
              (de 13 à 24 meses)
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.garrotes.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.garrotes.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              Novilhos
              <br />
              (de 25 à 36 meses)
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.novilhos.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.novilhos.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              Acima de <br /> (36 meses)
              <br />
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.outros.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.outros.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p id="total-RA">Total de Bovinos</p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.total.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.total.female}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonReportDeclare;
