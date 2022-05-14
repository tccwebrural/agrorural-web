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
  const [initialValues, setInitialValues] = useState<PerfilModelUser>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
  });

  const loadingHelper = useGlobalLoading();

  useEffect(() => {
    auth.getUser().then((user?: UserModel) => {
      if (user) {
        toast.success("Pagina carregada!");
        setInitialValues(user);
      } else {
        toast.error("Erro ao carregar a página!");
      }
      loadingHelper.stopLoading();
    });
  }, []);

  //   const metodoParavoce = () => {};
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
            <h2 id="Block-Txt-CattleDeclaration">Declare do Rebanho</h2>
            <span id="Block-Line-CattleDeclaration">
              <abbr title="Imprimir Declare do Rebanho">
                <Fab id="printIcon" onClick={imprimir}>
                  <BsPrinter size={20} />
                </Fab>
                <Button>
                  <AssignmentIcon />
                </Button>
              </abbr>
            </span>
          </div>
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
                    {...getControls(formik, "Nome do proprietário:")}
                    variant="standard"
                    sx={{ width: "50%" }}
                    disabled={true}
                  />
                </div>
              )}
            </Formik>
          </div>

          <div>
            <p className="CattleDeclaration">Rebanho Bovino Atual Existente</p>
            {/* colar o componente aqui dentro */}
            {ReportComponentCreate()}
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

                <p>Ou</p>
                <div>
                  <p>Leite</p>
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    style={{ marginRight: -35, marginTop: -80 }}
                  />
                  <img id="CowImage-CattleDeclaration" src={vaca_sem_chifre} />
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
