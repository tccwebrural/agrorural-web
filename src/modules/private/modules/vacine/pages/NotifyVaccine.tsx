import { Box, Container, Grid } from "@mui/material";
import { ReactElement } from "react";
import "../../../styles/NotifyVaccine.css";

const nomeVacina = "brucelose";
const dataVacina = "01/05/2022";
const identificadorAnimal = "josefina";
const tipoAnimal = "Bezerra Femea";

const notifyVaccine = (): ReactElement => {
  return (
    <>
      <Box>
        <Container>
          <div id="Bloco-Geral">
            <div className="Block-Txt-Line">
              <h2 className="Block-Line">
                <span className="Block-Txt">Notificações</span>
              </h2>
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Grid sx={{ margin: "1%" }}>
                <div id="Bloco-Notificacoes">
                  <div id="color2"></div>
                  <div></div>
                  <div id="text-notify">
                    <div id="text-notify-title">
                      <h3>Faltam 7 Dias para a vacina do Animal</h3>
                    </div>
                    <div id="text-notify-dados">
                      <form id="dados">
                        <h4>Nome da Vacina: {nomeVacina} </h4>
                        <h4>Data da Vacina: {dataVacina} </h4>
                      </form>
                      <form id="dados">
                        <h4>identificação do Animal: {identificadorAnimal} </h4>
                        <h4>tipo do Animal: {tipoAnimal} </h4>
                      </form>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid sx={{ margin: "1%" }}>
                <div id="Bloco-Notificacoes">
                  <div id="color"></div>
                  <div></div>
                  <div id="text-notify">
                    <div id="text-notify-title">
                      <h3>Faltam 14 Dias para a vacina do Animal</h3>
                    </div>
                    <div id="text-notify-dados">
                      <form id="dados">
                        <h4>Nome da Vacina: {nomeVacina} </h4>
                        <h4>Data da Vacina: {dataVacina} </h4>
                      </form>
                      <form id="dados">
                        <h4>identificação do Animal: {identificadorAnimal} </h4>
                        <h4>tipo do Animal: {tipoAnimal} </h4>
                      </form>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid sx={{ margin: "1%" }}>
                <div id="Bloco-Notificacoes">
                  <div id="color"></div>
                  <div></div>
                  <div id="text-notify">
                    <div id="text-notify-title">
                      <h3>Faltam 14 Dias para a vacina do Animal</h3>
                    </div>
                    <div id="text-notify-dados">
                      <form id="dados">
                        <h4>Nome da Vacina: {nomeVacina} </h4>
                        <h4>Data da Vacina: {dataVacina} </h4>
                      </form>
                      <form id="dados">
                        <h4>identificação do Animal: {identificadorAnimal} </h4>
                        <h4>tipo do Animal: {tipoAnimal} </h4>
                      </form>
                    </div>
                  </div>
                </div>
              </Grid>
            </Box>
          </div>
        </Container>
      </Box>
    </>
  );
};
export default notifyVaccine;
