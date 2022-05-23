import { MALE } from "./../../../../../constants";
import { map } from "@firebase/util";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { useEffect, useState } from "react";
import { CattleModel } from "../../cattles/models/CattleModel";
import { ReportModel } from "../models/ReportModel";
import { CattleHelper } from "./../../cattles/helpers/CattleHelper";

export const getTotaCattle = () => {
  const cattlehelpers = CattleHelper();
  const loadingHelper = useGlobalLoading();

  const [report, setReport] = useState<ReportModel>({
    rebanhoAtual: {
      bezerros: {
        male: 0,
        female: 0,
      },
      desmamados: { male: 0, female: 0 },
      garrotes: { male: 0, female: 0 },
      novilhos: { male: 0, female: 0 },
      outros: { male: 0, female: 0 },
      total: { male: 0, female: 0 },
    },
    rebanhoComCausas: {
      bezerros: {
        male: 0,
        female: 0,
      },
      desmamados: { male: 0, female: 0 },
      garrotes: { male: 0, female: 0 },
      novilhos: { male: 0, female: 0 },
      outros: { male: 0, female: 0 },
      total: { male: 0, female: 0 },
    },
  });

  const getMonthFromDate = (date: string) => {
    var birthDay = new Date(date);
    var today = new Date();
    var birthDayYear = birthDay.getFullYear();
    var todayYear = today.getFullYear();
    var birthDayMonth = birthDay.getMonth();
    var todayMonth = today.getMonth();
    return todayMonth + 12 * todayYear - (birthDayMonth + 12 * birthDayYear);
  };

  const [cattleModelk, SetCattle] = useState<CattleModel>();
  const initialValues = 0;
  const getTotalCattles = () => {
    useEffect(() => {
      loadingHelper.startLoading();
      cattlehelpers.getAllCattles().then((cattles) => {
        const resultado = cattles

          .map((cattle) => ({
            ...cattle,
            age: getMonthFromDate(cattle.birthday),
          }))
          .reduce(
            (previousValues: any, currentValue: any) => {
              const age = getMonthFromDate(currentValue.birthday);
              const initialValue = 0;
              if (currentValue.sex === MALE) {
                if (currentValue.age >= 0 && currentValue.age <= 6) {
                  // previousValues.totalBezerrosM = currentValue.totalBezerrosM + 1;
                  previousValues.totalBezerrosM =
                    previousValues.totalBezerrosM + 1;
                } else if (currentValue.age > 6 && currentValue.age <= 12) {
                  previousValues.totalDesmamadosM =
                    previousValues.totalDesmamadosM + 1;
                } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                  previousValues.totalGarrotesM =
                    previousValues.totalGarrotesM + 1;
                } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                  previousValues.totalNovilhosM =
                    previousValues.totalBezerrosM + 1;
                } else {
                  previousValues.totalOutrosM = previousValues.totalOutrosM + 1;
                }
              } else {
                if (currentValue.age >= 0 && currentValue.age <= 6) {
                  // previousValues.totalBezerrosM = currentValue.totalBezerrosM + 1;
                  previousValues.totalBezerrosF =
                    previousValues.totalBezerrosF + 1;
                } else if (currentValue.age > 6 && currentValue.age <= 12) {
                  previousValues.totalDesmamadosF =
                    previousValues.totalDesmamadosF + 1;
                } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                  previousValues.totalGarrotesF =
                    previousValues.totalGarrotesF + 1;
                } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                  previousValues.totalNovilhosF =
                    previousValues.totalNovilhosF + 1;
                } else {
                  previousValues.totalOutrosF = previousValues.totalOutrosF + 1;
                }
              }
              previousValues.totalCattlesMale =
                previousValues.totalOutrosM +
                previousValues.totalBezerrosM +
                previousValues.totalDesmamadosM +
                previousValues.totalGarrotesM +
                previousValues.totalNovilhosM;

              //TOTAL CATTLES FEMALE

              previousValues.totalCattlesFemale =
                previousValues.totalBezerrosF +
                previousValues.totalDesmamadosF +
                previousValues.totalGarrotesF +
                previousValues.totalNovilhosF +
                previousValues.totalOutrosF;

              return previousValues;
            },
            {
              totalBezerrosM: 0,
              totalDesmamadosM: 0,
              totalGarrotesM: 0,
              totalNovilhosM: 0,
              totalOutrosM: 0,
              totalCattlesFemale: 0,
              totalCattlesMale: 0,
              totalBezerrosF: 0,
              totalDesmamadosF: 0,
              totalGarrotesF: 0,
              totalNovilhosF: 0,
              totalOutrosF: 0,
            }
          );
        currentReport.rebanhoAtual.bezerros.male = resultado.totalBezerrosM;
        currentReport.rebanhoAtual.bezerros.female = resultado.totalBezerrosF;
        currentReport.rebanhoAtual.desmamados.male = resultado.totalDesmamadosM;
        currentReport.rebanhoAtual.desmamados.female =
          resultado.totalDesmamadosF;
        currentReport.rebanhoAtual.garrotes.male = resultado.totalGarrotesM;
        currentReport.rebanhoAtual.garrotes.female = resultado.totalGarrotesF;
        currentReport.rebanhoAtual.novilhos.male = resultado.totalNovilhosM;
        currentReport.rebanhoAtual.novilhos.female = resultado.totalNovilhosF;
        currentReport.rebanhoAtual.outros.male = resultado.totalOutrosM;
        currentReport.rebanhoAtual.outros.female = resultado.totalOutrosF;
        currentReport.rebanhoAtual.total.male = resultado.totalCattlesMale;
        currentReport.rebanhoAtual.total.female = resultado.totalCattlesFemale;
        return resultado;
      });

      //...
      const currentReport = report;

      //   //...REBANHO COM CAUSAS
      currentReport.rebanhoComCausas.bezerros.male = 0;
      currentReport.rebanhoComCausas.bezerros.female = 0;
      currentReport.rebanhoComCausas.desmamados.male = 0;
      currentReport.rebanhoComCausas.desmamados.female = 0;
      currentReport.rebanhoComCausas.garrotes.male = 0;
      currentReport.rebanhoComCausas.garrotes.female = 0;
      currentReport.rebanhoComCausas.novilhos.male = 0;
      currentReport.rebanhoComCausas.novilhos.female = 0;
      currentReport.rebanhoComCausas.outros.male = 0;
      currentReport.rebanhoComCausas.outros.female = 0;
      setReport(currentReport);

      loadingHelper.stopLoading();
      console.log("reports" + report);
    }, []);
  };
  return {
    getTotalCattles,
  };
};
