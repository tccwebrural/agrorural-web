import { Box } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Grid } from "@mui/material";
import { CattleHelper } from "modules/private/modules/cattles/helpers/CattleHelper";
import { VacineHelper } from "modules/private/modules/vacine/helpers/VacineHelpers";
import { useParams } from "react-router-dom";
import { useGlobalLoading } from "./GlobalLoadingProvider";
import { VaccineNotifyModel } from "modules/private/modules/notifications/models/VaccineNotifyModel";
import { CattleModel } from "modules/private/modules/cattles/models/CattleModel";

class Notification {
  name!: string;
}
type NotificationContext = {
  getNotification: () => Promise<Array<Notification>>;
};
const LoaderNotificationProvider = () => {
  const vaccineBrucelose = "Brucelose";
  const vaccineFebreAftosa = "Febre aftosa";
  const vaccineRaiva = "Raiva";
  const vacinasObrigatorias = ["Brucelose", "Raiva", "Febre aftosa"];

  var today = new Date();
  var mesAtual = today.getMonth() + 1;

  const getFromDate = (date: string) => {
    const dataSeparada = date.split("-");
    const ano = parseInt(dataSeparada[0]);
    const mes = parseInt(dataSeparada[1]);
    const dia = parseInt(dataSeparada[2]);

    var aplicationDate = new Date(ano, mes, dia);
    var YearAplicationDate;

    return YearAplicationDate = aplicationDate.getFullYear();
  };
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

  const [notification, setNotification] = useState<
    Array<Notification> | undefined
  >();

  const getNotification = async () => {
if (notification === undefined || notification.length === 0) {
      await cattlehelpers.getAllCattles().then(async(cattles) => {
        const listToVaccine: any[] = [];

        for (let index = 0; index < cattles.length; index++) {
          const cattle = {
            ...cattles[index],
            age: getMonthFromDate(cattles[index].birthday),
            idCattle: cattles[index].id,
          };
          console.log("Animal: " + cattles[index].name);

          

          if (cattle.status != 3 && cattle.idCattle) {
            await vacineHelpers
              .getAllVacines(cattle.idCattle)
              .then((vacines) => {
                var vaccines = 0;
                for (let i = 0; i < vacines.length; i++) {
                  const yearOfVaccine = {
                    year: getFromDate(vacines[i].date_application),
                  };
                  vaccines = yearOfVaccine.year;
                }

                let result = [""];

                result = vacinasObrigatorias.filter(
                  (x) =>
                    vaccines != today.getFullYear() ||
                    !vacines.map((vacines) => vacines.name).includes(x)
                );

                for (let i = 0; i < result.length; i++) {

                  if (result[i] === vaccineBrucelose) {
                    if (
                      cattle.sex === 2 &&
                      cattle.age >= 3 &&
                      cattle.age <= 8
                    ) {
                      const cattleAndVaccines = {
                        animalName: cattles[index].name,
                        animalId: cattle.identifier,
                        animalSex: cattle.sex,
                        vaccineName: vaccineBrucelose,
                      };
                      listToVaccine.push(cattleAndVaccines);

                    }
                  } else if (result[i] === vaccineFebreAftosa) {
                    if (mesAtual === 6 && cattle.age < 24) {
                      const cattleAndVaccines = {
                        animalName: cattles[index].name,
                        animalId: cattle.identifier,
                        animalSex: cattle.sex,
                        vaccineName: vaccineFebreAftosa,
                      };
                      listToVaccine.push(cattleAndVaccines);
                    } else if (mesAtual === 11 && cattle.age >= 24) {
                      const cattleAndVaccines = {
                        animalName: cattles[index].name,
                        animalId: cattle.identifier,
                        animalSex: cattle.sex,
                        vaccineName: vaccineFebreAftosa,
                      };
                      listToVaccine.push(cattleAndVaccines);
                    }
                  } else if (result[i] === vaccineRaiva) {
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
          setNotification(listToVaccine);

          loading.stopLoading();
        }
      });
    }
    return notification || [];
   
  };
  return {
    getNotification,
  };

};

const NotificationContext = createContext<NotificationContext | {}>({});
const ProviderNotification = (props: { children: ReactNode }) => {
  const provider = LoaderNotificationProvider();

  return (
    <NotificationContext.Provider value={provider}>
      {props.children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  return useContext(NotificationContext) as NotificationContext;
};

export { useNotification, ProviderNotification };