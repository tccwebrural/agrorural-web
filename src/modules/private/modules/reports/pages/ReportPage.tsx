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
  TextField,
  Checkbox,
  Button,
} from "@mui/material";
import vaca_sem_chifre from "../../../../../assets/vaca-sem-chifre.png";
import AssignmentIcon from "@mui/icons-material/Assignment";
import vaca from "../../../../../assets/vaca-sem-chifre.png";

import React, { ReactElement, useEffect, useState } from "react";
import { useAuth } from "../../../../../providers/AuthProvider";
import "../../../styles/Home.css";
import { BsPrinter } from "react-icons/bs";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { CattleModel, CATTLE_TYPES } from "../../cattles/models/CattleModel";
import toast from "react-hot-toast";
import { Agent } from "https";
import ReportComponentCreate from "../components/ReportCreateComponent";
import { PerfilModelUser, UserModel } from "modules/public/models/UserModel";
import { RegisterValidatorSchema } from "modules/public/modules/authentication/validators/RegisterValidatorSchema";
import { Formik } from "formik";
import { getControls } from "utils/FormUtils";
import ProprietarieData from "../components/ProprietarieData";
import ButtonReportDeclare from "../components/CurrentCattleComponent";
import GeneratePdf from "../components/GeneratePdf";

var today = new Date();
var currentYear = today.getFullYear();
var lastYear = today.getFullYear() - 1;
var twoYearsAgo = today.getFullYear() - 2;
var threeYearsAgo = today.getFullYear() - 3;
var fourYearsAgo = today.getFullYear() - 4;
var periodo = [currentYear, lastYear, twoYearsAgo, threeYearsAgo, fourYearsAgo];

const ReportPage = (): ReactElement => {
  function imprimir() {
    window.print();
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const auth = useAuth();

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
  const loadingHelper = useGlobalLoading();

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
      })
      .catch((err: any) => {
        toast.error(err);
        loadingHelper.stopLoading();
      });
  }, []);

  const submitForm = (user: PerfilModelUser) => {};
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="MainBlock">
          <div id="Block-Txt-Line-CattleDeclaration">
            <h2 id="Block-Txt-CattleDeclaration">Declare do Rebanhossss</h2>
            <span id="Block-Line-CattleDeclaration">
              <abbr title="Imprimir Declare do Rebanho">
                <Fab id="printIcon" onClick={imprimir}>
                  <BsPrinter size={20} />
                </Fab>
              </abbr>
            </span>
          </div>
          {/* COMPONENTE DADOS DO PROPRIETARIO AQUI */}
          {ProprietarieData()}
          {/* REBANHO BOVINO ATUAL */}
          {ButtonReportDeclare()}

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
                <div className="FieldMF-alt-Left"></div>
                <div className="FieldMF-alt-Rigth"></div>
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
          <div>
            <p className="CattleDeclaration">
              Marque a principal finalidade do seu rebanho bovino
            </p>
            <div id="CattleDeclaration-Goal">
              <div id="BeefCattle-DairyCattle">
                <div>
                  <p>Corte</p>
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                </div>

                <p>Ou</p>
                <div>
                  <p>Leite</p>
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    style={{ marginRight: -35, marginTop: -80 }}
                  />
                  <img id="CowImage-CattleDeclaration" src={vaca} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ReportPage;
