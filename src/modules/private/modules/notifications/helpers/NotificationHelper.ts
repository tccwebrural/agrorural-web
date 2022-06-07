export const NotificationHelper = () => {
  // cattlehelpers.getAllCattles().then(async (cattles) => {
  //   const listToVaccine: any[] = [];
  //   for (let index = 0; index < cattles.length; index++) {
  //     //PEGA TODOS ANIMAIS
  //     const cattle = {
  //       ...cattles[index],
  //       age: getMonthFromDate(cattles[index].birthday),
  //       idCattle: cattles[index].id,
  //     };
  //     console.log("Animal: " + cattles[index].name);
  //     if (cattle.idCattle && cattle.status != 3) {
  //       await vacineHelpers.getAllVacines(cattle.idCattle).then((vacines) => {
  //         let result = [""];
  //         result = vacinasObrigatorias.filter(
  //           (x) => !vacines.map((vacines) => vacines.name).includes(x)
  //         );
  //         console.log(
  //           "VACINAS QUE FALTA " + cattles[index].name + " : " + result
  //         );
  //         for (let i = 0; i <= result.length; i++) {
  //           if (result[i] === vaccineBrucelose) {
  //             if (cattle.sex === 2 && cattle.age >= 3 && cattle.age <= 8) {
  //               const cattleAndVaccines = {
  //                 animalName: cattles[index].name,
  //                 animalId: cattle.identifier,
  //                 animalSex: cattle.sex,
  //                 vaccineName: vaccineBrucelose,
  //               };
  //               listToVaccine.push(cattleAndVaccines);
  //             }
  //           } else if (result[i] === vaccineFebreAftosa) {
  //             if (mesAtual === 6 && cattle.age < 24) {
  //               const cattleAndVaccines = {
  //                 animalName: cattles[index].name,
  //                 animalId: cattle.identifier,
  //                 animalSex: cattle.sex,
  //                 vaccineName: vaccineFebreAftosa,
  //               };
  //               listToVaccine.push(cattleAndVaccines);
  //             } else if (mesAtual === 11 && cattle.age >= 24) {
  //               const cattleAndVaccines = {
  //                 animalName: cattles[index].name,
  //                 animalId: cattle.identifier,
  //                 animalSex: cattle.sex,
  //                 vaccineName: vaccineFebreAftosa,
  //               };
  //               listToVaccine.push(cattleAndVaccines);
  //             }
  //           } else if (result[i] === vaccineRaiva) {
  //             const cattleAndVaccines = {
  //               animalName: cattles[index].name,
  //               animalId: cattle.identifier,
  //               animalSex: cattle.sex,
  //               vaccineName: vaccineRaiva,
  //             };
  //             listToVaccine.push(cattleAndVaccines);
  //           }
  //         }
  //       });
  //     }
  //     setCattles(cattles);
  //     setNotificacao(listToVaccine);
  //     loading.stopLoading();
  //   }
  // });
};
