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
const vaccineFebreAftosa = "Febre aftosa";
const vaccineRaiva = "Raiva";

const vacinasObrigatorias = ["Brucelose", "Raiva", "Febre aftosa"];

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

  useEffect(() => {
    loading.startLoading();

    cattlehelpers.getAllCattles().then(async (cattles) => {
      const listToVaccine: any[] = [];
      
      for (let index = 0; index < cattles.length; index++) {
        //PEGA TODOS ANIMAIS
        const cattle = {
          ...cattles[index],
          age: getMonthFromDate(cattles[index].birthday),
          idCattle: cattles[index].id,
        };
        console.log("Animal: " + cattles[index].name);

        if (cattle.idCattle) {
          await vacineHelpers.getAllVacines(cattle.idCattle).then((vacines) => {
            let result = [""];   
           
              result = vacinasObrigatorias.filter((x) => !vacines.map(vacines => vacines.name).includes(x));
              console.log("VACINAS QUE FALTA " + cattles[index].name + " : " + result );
            
            for (let i = 0; i < result.length; i++) {
              if (result[i] === vaccineBrucelose) {
                if (cattle.sex === 2 && cattle.age >= 3 && cattle.age <= 8) {
                  const cattleAndVaccines = {
                    animalName: cattles[index].name,
                    animalId: cattle.identifier,
                    animalSex: cattle.sex,
                    vaccineName: vaccineBrucelose,
                  };
                  listToVaccine.push(cattleAndVaccines);
                }
              }
              else if (result[i] === vaccineFebreAftosa) {
                if (mesAtual === 6 && cattle.age < 24) {
                  const cattleAndVaccines = {
                    animalName: cattles[index].name,
                    animalId: cattle.identifier,
                    animalSex: cattle.sex,
                    vaccineName: vaccineFebreAftosa,
                  };
                  listToVaccine.push(cattleAndVaccines);
                }
                else if (mesAtual === 11 && cattle.age >= 24) {
                  const cattleAndVaccines = {
                    animalName: cattles[index].name,
                    animalId: cattle.identifier,
                    animalSex: cattle.sex,
                    vaccineName: vaccineFebreAftosa,
                  };
                  listToVaccine.push(cattleAndVaccines);
                }
              }
               else  if(result[i] === vaccineRaiva){
                  const cattleAndVaccines = {
                    animalName: cattles[index].name,
                    animalId: cattle.identifier,
                    animalSex: cattle.sex,
                    vaccineName: vaccineRaiva,
                  };
                  listToVaccine.push(cattleAndVaccines);
              }
            }
          });
        }

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
