import { Box, Grid } from "@mui/material";
// import { GLOBAL_LOADING_KEY } from "constants";
import { GLOBAL_LOADING_KEY } from "../../../../../constants";
import { useNotification } from "providers/NotificationProvider";
import { ReactElement, useContext, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";

import "../../../styles/NotifyVaccine.css";

const VaccineNotify = (): ReactElement => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const notifyProvider = useNotification();

  // useEffect(() => {
  //   notifyProvider.getNotification().then((notify) => {
  //     setNotifications(notify);
  //   });
  // }, []);
  useEffect(() => {
    trackPromise(
      notifyProvider.getNotification().then((notify) => {
        setNotifications(notify);
      }),
      GLOBAL_LOADING_KEY
    );
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div id="Bloco-GeralNotificacao">
          <div className="Block-Txt-Line">
            <h2 className="Block-Line">
              <span id="Block-Txt-Notify">Notificações</span>
            </h2>
          </div>
          {notifications.map((listToDisplay, i) => {
            return (
              <>
                <Grid sx={{ margin: "1%" }}>
                  <div id="Bloco-Notificacoes">
                    <div id="color2"></div>
                    <div></div>
                    <div id="text-notify">
                      <div id="text-notify-title-Red">
                        O animal {listToDisplay.animalName} deve ser vacinado
                        contra {listToDisplay.vaccineName}!
                      </div>
                      <div id="text-notify-dados">
                        <form id="dados">
                          <p>
                            <span className="Txt-NotifyVaccine">
                              Vacina :
                              <span className="Txts-Notify">
                                {listToDisplay.vaccineName}
                              </span>
                            </span>{" "}
                          </p>
                          <p>
                            <span className="Txt-NotifyVaccine">
                              Id do Animal:
                              <span className="Txts-Notify">
                                {listToDisplay.animalId}
                              </span>
                            </span>{" "}
                          </p>
                        </form>

                        <form id="dados">
                          <p>
                            <span className="Txt-NotifyVaccine">
                              Nome do Animal:
                              <span className="Txts-Notify">
                                {listToDisplay.animalName}
                              </span>
                            </span>{" "}
                          </p>
                          <p>
                            <span className="Txt-NotifyVaccine">
                              Gênero:
                              <span className="Txts-Notify">
                                {listToDisplay.animalSex === 2
                                  ? "Fêmea"
                                  : "Macho"}
                              </span>
                            </span>{" "}
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </Grid>
              </>
            );
          })}
        </div>
      </Box>
    </>
  );
};
export default VaccineNotify;
