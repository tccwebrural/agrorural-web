import { Box, Container, Grid } from "@mui/material";
import { ReactElement } from "react";
import "../../../styles/NotifyVaccine.css";

const nomeVacina = "Brucelose";
const dataVacina = "01/05/2022";
const identificadorAnimal = "Mimosa";
const tipoAnimal = "Fêmea";

const notifyVaccine = (): ReactElement => {
  return (
    <>
      <Box>
        <Container>
          <div id="Bloco-Geral">
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
              <Grid sx={{ margin: "1%" }}>
                <div id="Bloco-Notificacoes">
                  <div id="color2"></div>
                  <div></div>
                  <div id="text-notify">
                    <div id="text-notify-title-Red">
                      <h3>O animal Mimosa deve ser vacinado!</h3>
                    </div>
                    <div id="text-notify-dados">
                      <form id="dados">
                        <p><span className="Txt-NotifyVaccine">Nome da Vacina:</span> {nomeVacina} </p>
                        <p><span className="Txt-NotifyVaccine">Data da Vacina:</span> {dataVacina} </p>
                      </form>
                      <form id="dados">
                        <p><span className="Txt-NotifyVaccine">Nome do Animal:</span> {identificadorAnimal} </p>
                        <p><span className="Txt-NotifyVaccine">Gênero:</span> {tipoAnimal} </p>
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
                      <h3>Faltam 14 dias para a vacina do animal Malhada</h3>
                    </div>
                    <div id="text-notify-dados">
                      <form id="dados">
                        <p><span className="Txt-NotifyVaccine">Nome da Vacina:</span> {nomeVacina} </p>
                        <p><span className="Txt-NotifyVaccine">Data da Vacina:</span> {dataVacina} </p>
                      </form>
                      <form id="dados">
                        <p><span className="Txt-NotifyVaccine">Nome do Animal:</span> Malhada </p>
                        <p><span className="Txt-NotifyVaccine">Gênero:</span> {tipoAnimal} </p>
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
                      <h3>Faltam 20 dias para a vacina do animal Lindóia</h3>
                    </div>
                    <div id="text-notify-dados">
                      <form id="dados">
                        <p><span className="Txt-NotifyVaccine">Nome da Vacina: </span>{nomeVacina} </p>
                        <p><span className="Txt-NotifyVaccine">Data da Vacina:</span> {dataVacina} </p>
                      </form>
                      <form id="dados">
                        <p><span className="Txt-NotifyVaccine">Nome do Animal:</span> Lindóia </p>
                        <p><span className="Txt-NotifyVaccine">Gênero:</span> {tipoAnimal} </p>
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
