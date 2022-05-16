import { useState } from "react";
import { CattleModel } from "../../cattles/models/CattleModel";
import { CattleHelper } from "./../../cattles/helpers/CattleHelper";

export const getTotaCattle = () => {
  const getAllCattle = CattleHelper();

  const getMonthFromDate = (date: string) => {
    var today = new Date();
    const dataSeparada = date.split("-");
    const ano = parseInt(dataSeparada[0]);
    const mes = parseInt(dataSeparada[1]);
    const dia = parseInt(dataSeparada[2]);

    var birthDate = new Date(ano, mes, dia);

    var months;
    months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth() + 1;
    months += today.getMonth();

    return months <= 0 ? 0 : months;
  };

  const [cattlesState, setCattlesState] = useState<CattleModel[]>([]);
  getAllCattle.getAllCattles().then((cattles) => {
    for (let index = 0; index < cattles.length; index++) {
      for (let index = 0; index < cattles.length; index++) {
        const cattle = {
          ...cattles[index],
          age: getMonthFromDate(cattles[index].birthday),
        };

        // cattles.map((cattleI) => cattle.age).reduce();

        // if (cattle.sex === 1) {
        //   if (cattle.age >= 0 && cattle.age <= 6) {
        //     tempTotalBezerrosM++;
        //   } else if (cattle.age > 6 && cattle.age <= 12) {
        //     tempTotalDesmamadosM++;
        //   } else if (cattle.age > 12 && cattle.age <= 24) {
        //     tempTotalGarrotesM++;
        //   } else if (cattle.age > 24 && cattle.age <= 36) {
        //     tempTotalNovilhosM++;
        //   } else {
        //     tempTotalAcimaDe36M++;
        //   }
        // } else {
        //   if (cattle.age >= 0 && cattle.age <= 6) {
        //     tempTotalBezerrosF++;
        //   } else if (cattle.age > 6 && cattle.age <= 12) {
        //     tempTotalDesmamadosF++;
        //   } else if (cattle.age > 12 && cattle.age <= 24) {
        //     tempTotalGarrotesF++;
        //   } else if (cattle.age > 24 && cattle.age <= 36) {
        //     tempTotalNovilhosF++;
        //   } else {
        //     tempTotalAcimaDe36F++;
        //   }
        // }
      }
    }
  });
};
