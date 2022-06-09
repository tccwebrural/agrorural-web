import { Box, Container, Grid } from "@mui/material";
import { ReactElement, useEffect } from "react";
import "../../../styles/NotifyVaccine.css";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { VacineHelper } from "../../vacine/helpers/VacineHelpers";
import { VacineModel } from "../../vacine/models/VacineModel";
import VaccineNotify from "../components/VaccineNotify";

const notifyVaccine = (): ReactElement => {
  return (
    <>
      <Box>
        <Container>
          <div id="Bloco-GeralNotificacao">
            <div className="Block-Txt-Line">
              <h2 className="Block-Line">
                <span id="Block-Txt-Notify">Notificações</span>
              </h2>
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              {/* <Grid sx={{ margin: "1%" }}>{VaccineNotify()}</Grid> */}
            </Box>
          </div>
        </Container>
      </Box>
    </>
  );
};
export default notifyVaccine;
