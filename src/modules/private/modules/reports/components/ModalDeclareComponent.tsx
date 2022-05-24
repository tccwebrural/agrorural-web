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

const ModalDeclareComponent = (): ReactElement => {
  const loadingHelper = useGlobalLoading();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const cattlehelpers = CattleHelper();
  function imprimir() {
    window.print();
  }

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
              } else {
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
    currentReport.rebanhoComCausas.bezerros.male = 0;
    currentReport.rebanhoComCausas.bezerros.female = 0;
    currentReport.rebanhoComCausas.desmamados.male = 0;
    currentReport.rebanhoComCausas.desmamados.female = 0;
    currentReport.rebanhoComCausas.garrotes.male = 0;
    currentReport.rebanhoComCausas.garrotes.female = 0;
    currentReport.rebanhoComCausas.novilhos.male = 0;
    currentReport.rebanhoComCausas.novilhos.female = 0;
    currentReport.rebanhoComCausas.outros.male = 0;
    currentReport.rebanhoComCausas.outros.female = 0;
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
        navigate("/private/home");
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 530,
            height: 240,
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: 11,
            p: 4,
          }}
        >
          <div id="bloco-modal-GerarRelatório">
            <Grid sx={{ margin: "2%  2%" }}>
              <span id="txt-GerarRelatorio">
                Tem certeza que deseja Gerar o Relatório?
              </span>
              <p id="txt-p-btnGerarRelatório">
                Após gerar o relatório você só poderar gerar novamente no mês
                seguinte!
              </p>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                justifyContent: "end",
                marginTop: 6,
                marginRight: 2,
              }}
            >
              <Grid
                sx={{
                  margin: " 3% 6%",
                  borderRadius: "5px",
                  backgroundColor: "rgba(0, 128, 0, 0.795)",
                }}
              >
                <Button onClick={submitSave} style={{ color: "var(--cor001)" }}>
                  Gerar Relatório
                </Button>{" "}
              </Grid>
              <Grid
                sx={{
                  margin: " 3% -5%",
                  borderRadius: "5px",
                  backgroundColor: "rgba(255, 0, 0, 0.849)",
                }}
              >
                <Button
                  onClick={handleClose}
                  style={{ color: "var(--cor001)" }}
                >
                  cancelar
                </Button>{" "}
              </Grid>
            </Grid>
          </div>
        </Box>
      </Modal>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        <div id="Block-Txt-Line-CattleDeclaration">
          <h2 id="Block-Txt-CattleDeclaration">Declare do Rebanho</h2>
          <span id="Block-Line-CattleDeclaration">
            <abbr title="Imprimir Declare do Rebanho">
              <Fab id="printIcon" onClick={imprimir}>
                <BsPrinter size={20} />
              </Fab>
            </abbr>
            <abbr title="Gerar Relatório do Animal">
              <Fab id="reportIcon" onClick={handleOpen}>
                <AssignmentIcon style={{ color: "var(--cor001" }} />
              </Fab>
            </abbr>
          </span>
        </div>
      </Box>
    </>
  );
};

export default ModalDeclareComponent;