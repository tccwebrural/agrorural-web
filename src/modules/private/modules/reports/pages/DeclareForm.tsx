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
import ButtonReportDeclare from "../components/ButtonReportDeclare";
import ModalDeclareComponent from "../components/ModalDeclareComponent";

const DeclareForm = (): ReactElement => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      {/* COMPONENTE DO MODAL DO GERAR RELATORIO */}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="MainBlock">
          {/* BLOCO RETIRADO */}
          {/* COMPONENTE DADOS DO PROPRIETARIO AQUI */}
          {ModalDeclareComponent()}
          {ProprietarieData()}
          {ButtonReportDeclare()}

          {/* COMPONENTE BOVINO ATUAL */}
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
