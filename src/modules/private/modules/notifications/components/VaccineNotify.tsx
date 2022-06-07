import { Box, Grid } from "@mui/material";

import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { ReactElement, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "../../../styles/NotifyVaccine.css";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { CattleModel } from "../../cattles/models/CattleModel";
import { VacineHelper } from "../../vacine/helpers/VacineHelpers";

import { VaccineNotifyModel } from "../models/VaccineNotifyModel";

 import {ProviderNotification} from "../../../../../providers/NotificationProvider";


const VaccineBrucelose = (): ReactElement => {
 

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        {/* {<ProviderNotification>
          
          {notificacao.map((listToDisplay, i) => {
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
        
        </ProviderNotification>
        
        /*  */} 
      </Box>
    </>
  );
};
export default VaccineBrucelose;
