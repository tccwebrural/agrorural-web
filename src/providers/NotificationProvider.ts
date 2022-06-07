import { CattleHelper } from "./../modules/private/modules/cattles/helpers/CattleHelper";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { ReactNode, useEffect, useState } from "react";
//import { NotifyContext } from './NotificationProvider';
import { VaccineNotifyModel } from "modules/private/modules/notifications/models/VaccineNotifyModel";
import { createContext } from "react";
import { VacineHelper } from "modules/private/modules/vacine/helpers/VacineHelpers";
import { CattleModel } from "modules/private/modules/cattles/models/CattleModel";

type NotificationContextProps = {
  children: ReactNode;
};
const initialValue = {};

export const NotifyContext = createContext(VaccineNotifyModel);

// export const NotifyContextProvider = ( {children} : NotificationContextProps) => {
//     return(
//         <NotifyContext.Provider value={{isOpenModal}}>
//         {children}
//         </NotifyContext.Provider>
//     )
// }
const [cattles, setCattles] = useState<CattleModel[]>([]);
const [notificacao, setNotificacao] = useState<VaccineNotifyModel[]>([]);

const getMonthFromDate = (date: string) => {
  var birthDay = new Date(date);

  var birthDayYear = birthDay.getFullYear();
  var todayYear = today.getFullYear();
  var birthDayMonth = birthDay.getMonth();
  var todayMonth = today.getMonth();

  return todayMonth + 12 * todayYear - (birthDayMonth + 12 * birthDayYear);
};
const loading = useGlobalLoading();
const cattlehelpers = CattleHelper();
const vacineHelpers = VacineHelper();
var today = new Date();
var mesAtual = today.getMonth() + 1;

const vaccineBrucelose = "Brucelose";
const vaccineFebreAftosa = "Febre aftosa";
const vaccineRaiva = "Raiva";

const vacinasObrigatorias = ["Brucelose", "Raiva", "Febre aftosa"];

// useEffect(() => {
//   notficationProvider();
// }, []);
type AuthContext = {};
const notficationProvider = async () => {
  loading.startLoading();
  const fetchData = async () => {};

  await cattlehelpers.getAllCattles().then(async (cattles) => {
    const listToVaccine: any[] = [];

    for (let index = 0; index < cattles.length; index++) {
      //PEGA TODOS ANIMAIS
      const cattle = {
        ...cattles[index],
        age: getMonthFromDate(cattles[index].birthday),
        idCattle: cattles[index].id,
      };

      console.log("Animal: " + cattles[index].name);

      if (cattle.status != 3 && cattle.idCattle) {
        await vacineHelpers.getAllVacines(cattle.idCattle).then((vacines) => {
          // for (let i = 0; i < vacines.length; i++) {
          //   const aplicationData= {
          //     ...vacines[index],
          //     data:  getDataFromDateVaccine(vacines[index].date_application),
          //   };
          //   console.log("DATA: " + aplicationData.data)
          // }

          let result = [""];

          result = vacinasObrigatorias.filter(
            (x) => !vacines.map((vacines) => vacines.name).includes(x)
          );
          console.log(
            "VACINAS QUE FALTA " + cattles[index].name + " : " + result
          );

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
      setNotificacao(listToVaccine);
      loading.stopLoading();
    }
  });
};

export { notficationProvider };
