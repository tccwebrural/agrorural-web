import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import ProprietarieData from "../components/ProprietarieData";
import "../../../styles/DeclareForm.css";
import "../../../styles/style.css";
import CurrentCattleComponent from "../components/CurrentCattleComponent";
import CattleDeathComponent from "../components/CattleDeathComponent";
import GenerateCattleReport from "../components/GenerateCattleReport";

const DeclareForm = (): ReactElement => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const loading = useGlobalLoading();
  useEffect(() => {
    loading.startLoading();
    loading.stopLoading();
  }, []);

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
          {GenerateCattleReport()}
          {ProprietarieData()}
          {CurrentCattleComponent()}
          {CattleDeathComponent()}

          {/* COMPONENTE BOVINO ATUAL */}

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
