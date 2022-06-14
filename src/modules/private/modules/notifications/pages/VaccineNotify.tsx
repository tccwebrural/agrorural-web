import { Box, Grid } from "@mui/material";
import { GLOBAL_LOADING_KEY } from "../../../../../constants";
import { useNotification } from "providers/NotificationProvider";
import { ReactElement, useContext, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";

import "../../../styles/NotifyVaccine.css";
import { randomUUID } from "crypto";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";

type NotificationType = {
  animalName: string;
  vaccineName: string;
  animalId: string;
  animalSex: number;
  id: string;
};
const VaccineNotify = (): ReactElement => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const notifyProvider = useNotification();
  const loadingProvider = useGlobalLoading();

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
          {notifications.map((element, i) => {
            return (
              <Grid key={i} sx={{ margin: "1%" }}>
                <div id="Bloco-Notificacoes">
                  <div id="color2"></div>
                  <div></div>
                  <div id="text-notify">
                    <div id="text-notify-title-Red">
                      O animal {element.animalName} deve ser vacinado contra{" "}
                      {element.vaccineName}!
                    </div>
                    <div id="text-notify-dados">
                      <div id="dados">
                        <p>
                          <span className="Txt-NotifyVaccine">
                            Vacina :
                            <span className="Txts-Notify">
                              {element.vaccineName}
                            </span>
                          </span>
                        </p>
                        <p>
                          <span className="Txt-NotifyVaccine">
                            Id do Animal:
                            <span className="Txts-Notify">
                              {element.animalId}
                            </span>
                          </span>{" "}
                        </p>
                      </div>

                      <div id="dados">
                        <p>
                          <span className="Txt-NotifyVaccine">
                            Nome do Animal:
                            <span className="Txts-Notify">
                              {element.animalName}
                            </span>
                          </span>{" "}
                        </p>
                        <p>
                          <span className="Txt-NotifyVaccine">
                            Gênero:
                            <span className="Txts-Notify">
                              {element.animalSex === 2 ? "Fêmea" : "Macho"}
                            </span>
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            );
          })}
        </div>
      </Box>
    </>
  );
};
export default VaccineNotify;
