import { ContactMailRounded, Vaccines } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";

import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { ReactElement, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "../../../styles/NotifyVaccine.css";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { CattleModel } from "../../cattles/models/CattleModel";
import { VacineHelper } from "../../vacine/helpers/VacineHelpers";

import { VaccineNotifyModel } from "../models/VaccineNotifyModel";

const vaccineBrucelose = "Brucelose";
const vaccineFebreAftosa = "Febre Aftosa";
const vaccineRaiva = "Raiva";

var today = new Date();
var mesAtual = today.getMonth() + 1;

const getMonthFromDateVaccine = (date: string) => {
  const dataSeparada = date.split("-");
  const ano = parseInt(dataSeparada[0]);
  const mes = parseInt(dataSeparada[1]);
  const dia = parseInt(dataSeparada[2]);

  var birthDate_vaccine = new Date(ano, mes, dia);

  var months;
  months = (today.getFullYear() - birthDate_vaccine.getFullYear()) * 12;
  months -= birthDate_vaccine.getMonth() + 1;
  months += today.getMonth();

  return months <= 0 ? 0 : months;
};

const VaccineBrucelose = (): ReactElement => {
  const [cattles, setCattles] = useState<CattleModel[]>([]);

  const getMonthFromDate = (date: string) => {
    var birthDay = new Date(date);

    var birthDayYear = birthDay.getFullYear();
    var todayYear = today.getFullYear();
    var birthDayMonth = birthDay.getMonth();
    var todayMonth = today.getMonth();

    return todayMonth + 12 * todayYear - (birthDayMonth + 12 * birthDayYear);
  };
  const cattlehelpers = CattleHelper();
  const vacineHelpers = VacineHelper();
  const { id } = useParams();
  const loading = useGlobalLoading();
  console.log(id);

  const [notificacao, setNotificacao] = useState<VaccineNotifyModel[]>([]);
  const vacinasObrigatorias = ["Brucelose", "Raiva", "Febre aftosa"];

  useEffect(() => {
    loading.startLoading();

    cattlehelpers.getAllCattles().then(async (cattles) => {
      let tempVacina = [""];
      let vacinasQueFalta = [""];
      const listToVaccine: any[] = [];

      for (let index = 0; index < cattles.length; index++) {
        const cattle = {
          ...cattles[index],
          age: getMonthFromDate(cattles[index].birthday),
          idCattle: cattles[index].id,
        };
        console.log("Animais: " + cattles[index].name);
        if (cattle.idCattle) {
          await vacineHelpers.getAllVacines(cattle.idCattle).then((vacines) => {
            for (let cont = 0; cont < vacines.length; cont++) {
              const vaccines = {
                ...vacines[cont],
                name: vacines[cont].name,
              };
              tempVacina[cont] = vaccines.name;

              
              if (tempVacina[cont] === vacinasObrigatorias[0]) {
                console.log("TEM brucelose");
              }else{
                vacinasQueFalta[0] = vacinasObrigatorias[0]

                const cattleAndVaccines = {
                  animalName: cattles[index].name,
                  animalId: cattle.identifier,
                  animalSex: cattle.sex,
                  vaccineName: vaccineBrucelose,
                };
                listToVaccine.push(cattleAndVaccines);
              }
              if (tempVacina[cont] === vacinasObrigatorias[1]) {
                console.log("TEM Raiva");
              }else{
                vacinasQueFalta[1] = vacinasObrigatorias[1]

                const cattleAndVaccines = {
                  animalName: cattles[index].name,
                  animalId: cattle.identifier,
                  animalSex: cattle.sex,
                  vaccineName: vaccineRaiva,
                };
                listToVaccine.push(cattleAndVaccines);
              }
              if (tempVacina[cont] === vacinasObrigatorias[2]) {
                console.log("TEM Febre aftosa");
              }else{
                vacinasQueFalta[2] = vacinasObrigatorias[2]

                const cattleAndVaccines = {
                  animalName: cattles[index].name,
                  animalId: cattle.identifier,
                  animalSex: cattle.sex,
                  vaccineName: vaccineFebreAftosa,
                };
                listToVaccine.push(cattleAndVaccines);
              }

            }
          });
        }
        console.log("Vacinas que falta" + vacinasQueFalta);

        setCattles(cattles);
        setNotificacao(listToVaccine);
        loading.stopLoading();
      }
    });
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
      </Box>
    </>
  );
};
export default VaccineBrucelose;
