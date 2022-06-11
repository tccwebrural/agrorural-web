import React, { createContext, ReactNode, useContext, useState } from "react";
import { CattleHelper } from "modules/private/modules/cattles/helpers/CattleHelper";
import { VacineHelper } from "modules/private/modules/vacine/helpers/VacineHelpers";
import { useParams } from "react-router-dom";
import { useGlobalLoading } from "./GlobalLoadingProvider";
import { CattleModel } from "modules/private/modules/cattles/models/CattleModel";

class Notification {
  name!: string;
}
type NotificationContext = {
  // getNotification: () => Promise<Array<Notification>>;
  getNotification: () => Promise<void[]>;
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

    return (YearAplicationDate = aplicationDate.getFullYear());
  };
  const getDateVaccineAplication = (date: string) => {
    const dataSeparada = date.split("-");
    const ano = parseInt(dataSeparada[0]);
    const mes = parseInt(dataSeparada[1]);
    const dia = parseInt(dataSeparada[2]);

    var aplicationDate = new Date(ano, mes, dia);

    return aplicationDate;
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
  const loading = useGlobalLoading();

  // const [notification, setNotification] = useState<
  //   Array<Notification> | undefined
  // >();
  const [notification, setNotification] = useState<any[]>([]);

  const getNotification = async () => {
    if (notification === undefined || notification.length === 0) {
      await cattlehelpers.getAllCattles().then(async (cattles) => {
        const listToVaccine: any[] = [];

        for (let index = 0; index < cattles.length; index++) {
          const cattle = {
            ...cattles[index],
            age: getMonthFromDate(cattles[index].birthday),
            idCattle: cattles[index].id,
          };

          if (cattle.status != 3 && cattle.idCattle) {
            await vacineHelpers
              .getAllVacines(cattle.idCattle)
              .then((vacines) => {
                var yearOfVaccine = 0;
                var anoDoseReforco = 0;
                var mesDoseReforco = 0;
                var diaDoseReforco = 0;
                var contVaccineRaiva = 0;
                for (let i = 0; i < vacines.length; i++) {
                  const vaccines = {
                    year: getFromDate(vacines[i].date_application),
                    dataAplicacao: getDateVaccineAplication(
                      vacines[i].date_application
                    ),
                    vaccinesName: vacines[i].name,
                  };
                  yearOfVaccine = vaccines.year;
                  anoDoseReforco = vaccines.dataAplicacao.getFullYear();
                  mesDoseReforco = vaccines.dataAplicacao.getMonth() + 1;
                  diaDoseReforco = vaccines.dataAplicacao.getUTCDate();
                  if (vaccines.vaccinesName === vaccineRaiva) {
                    contVaccineRaiva++;
                  }
                }
                console.log("TESTE")
                let result = [""];
                result = vacinasObrigatorias.filter(
                  (x) =>
                    yearOfVaccine != today.getFullYear() ||
                    !vacines.map((vacines) => vacines.name).includes(x)
                );

                if (mesDoseReforco > 12) {
                  mesDoseReforco = 1;
                  anoDoseReforco = anoDoseReforco + 1;
                }
                if (
                  contVaccineRaiva === 1 &&
                  anoDoseReforco === today.getFullYear() &&
                  mesDoseReforco === today.getMonth() + 1 &&
                  diaDoseReforco === today.getUTCDate()
                ) {
                  const cattleAndVaccines = {
                    animalName: cattles[index].name,
                    animalId: cattle.identifier,
                    animalSex: cattle.sex,
                    vaccineName: vaccineRaiva,
                  };
                  listToVaccine.push(cattleAndVaccines);
                }
                for (let i = 0; i < result.length; i++) {
                  if (
                    result[i] === vaccineBrucelose &&
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
                  } else if (
                    result[i] === vaccineFebreAftosa &&
                    mesAtual === 6 &&
                    cattle.age < 24
                  ) {
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
