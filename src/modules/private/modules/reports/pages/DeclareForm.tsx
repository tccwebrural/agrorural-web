import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { BsPrinter } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { useAuth } from "providers/AuthProvider";
import { PerfilModelUser, UserModel } from "modules/public/models/UserModel";
import { Formik } from "formik";
import { getControls } from "utils/FormUtils";
import { RegisterValidatorSchema } from "modules/public/modules/authentication/validators/RegisterValidatorSchema";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import toast from "react-hot-toast";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import ProprietarieData from "../components/ProprietarieData";
import AssignmentIcon from "@mui/icons-material/Assignment";

import vaca from "../../../../../assets/vaca-sem-chifre.png";

import "../../../styles/DeclareForm.css";
import "../../../styles/style.css";

const DeclareForm = (): ReactElement => {
  function imprimir() {
    window.print();
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const auth = useAuth();
  const [initialValues, setInitialValues] = useState<PerfilModelUser>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    farmName: "",
  });

  const getAgeFromDate = (date: string) => {
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
  const getMonthFromDate = (date: string) => {
    var birthDay = new Date(date);
    var today = new Date();
    var birthDayYear = birthDay.getFullYear();
    var todayYear = today.getFullYear();
    var birthDayMonth = birthDay.getMonth();
    var todayMonth = today.getMonth();
    return todayMonth + 12 * todayYear - (birthDayMonth + 12 * birthDayYear);
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
          console.log("idade: " + cattle.age);

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitForm = (user: PerfilModelUser) => {};
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
                <Button style={{ color: "var(--cor001)" }}>
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
        <div className="MainBlock">
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
          {/* COMPONENTE DADOS DO PROPRIETARIO AQUI */}
          {ProprietarieData()}

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
                <div className="FieldMF-alt-Left-RA">{totalBezerrosM}</div>
                <div className="FieldMF-alt-Rigth-RA">{totalBezerrosF}</div>
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
                <div className="FieldMF-alt-Left-RA">{totalDesmamadosM}</div>
                <div className="FieldMF-alt-Rigth-RA">{totalDesmamadosF}</div>
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
                <div className="FieldMF-alt-Left-RA">{totalGarrotesM}</div>
                <div className="FieldMF-alt-Rigth-RA">{totalGarrotesF}</div>
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
                <div className="FieldMF-alt-Left-RA">{totalNovilhosM}</div>
                <div className="FieldMF-alt-Rigth-RA">{totalNovilhosF}</div>
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
                <div className="FieldMF-alt-Left-RA">{totalAcimaDe36M}</div>
                <div className="FieldMF-alt-Rigth-RA">{totalAcimaDe36F}</div>
              </div>
              <div className="Block-CurrentCattleHerd-RA">
                <p id="total-RA">Total de Bovinos</p>
                <div className="MF-RA">
                  <p className="M-txt-RA">Macho</p>
                  <p className="F-txt-RA">Fêmea</p>
                </div>
                <div className="FieldMF-alt-Left-RA">{totalDeAnimaisM}</div>
                <div className="FieldMF-alt-Rigth-RA">{totalDeAnimaisF}</div>
              </div>
            </div>
          </div>
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

                <p id="text-OU">Ou</p>

                <div>
                  <p>Leite</p>
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default DeclareForm;
