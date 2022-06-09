import { Box, Grid } from "@mui/material";

import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { ReactElement, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { number } from "yup/lib/locale";

import "../../../styles/NotifyVaccine.css";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { CattleModel } from "../../cattles/models/CattleModel";
import { VacineHelper } from "../../vacine/helpers/VacineHelpers";

import { VaccineNotifyModel } from "../models/VaccineNotifyModel";

import {
  ProviderNotification,
  useNotification,
} from "../../../../../providers/NotificationProvider";
import { trackPromise } from "react-promise-tracker";
import { GLOBAL_LOADING_KEY } from "../../../../../constants";

const VaccineNotify = (): ReactElement => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const notifyProvider = useNotification();

  // useEffect(() => {
  //   trackPromise(
  //     notifyProvider.getNotification().then((notify) => {
  //       setNotifications(notify);
  //     }),
  //     GLOBAL_LOADING_KEY
  //   );
  // }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        {notifications.map((listToDisplay) => {
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
      </Box>
    </>
  );
};
export default VaccineNotify;
