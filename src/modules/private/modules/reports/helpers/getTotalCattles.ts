import { map } from "@firebase/util";
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
      // const cattle = {
      //   ...cattles[index],
      //   age: getMonthFromDate(cattles[index].birthday),
      // };
      let tempTotalBezerrosM = 0;
      let tempTotalDesmamadosM = 0;
      let tempTotalGarrotesM = 0;
      let tempTotalNovilhosM = 0;
      let tempTotalAcimaDe36M = 0;

      let tempTotalBezerrosF = 0;
      let tempTotalDesmamadosF = 0;
      let tempTotalGarrotesF = 0;
      let tempTotalNovilhosF = 0;
      let tempTotalAcimaDe36F = 0;
      let totalMale = 10;
      let totalFemale = 10;
      return cattles;
      // .map((i) => {
      //   const cattle = {
      //     ...cattles[index],
      //     age: getMonthFromDate(cattles[index].birthday),
      //   };

      // )
      // .reduce((cattles) => cattles);
    }
    console.log("CATTLES :" + cattles);
  });
};
