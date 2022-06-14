
import React, { ReactElement, useEffect, useState } from "react";
import "../../../styles/Home.css";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { ReportModel } from "../models/ReportModel";
import { MALE, FEMALE} from "../../../../../constants";

import { Timestamp } from "firebase/firestore";

const CurrentCattleComponent = (): ReactElement => {
  const loadingHelper = useGlobalLoading();

  const cattlehelpers = CattleHelper();

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
    deathByDiversousCases: {
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
    deathByOwnConsuption: {
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

    createdAt: Timestamp.now(),
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
            if (currentValue.sex === MALE && currentValue.status != 3) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
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
            } else if (
              currentValue.sex === FEMALE &&
              currentValue.status != 3
            ) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
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
      currentReport.rebanhoAtual.desmamados.female = resultado.totalDesmamadosF;
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

    setReport(currentReport);

    loadingHelper.stopLoading();
  }, []);

  return (
    <>
      <div>
        <p className="CattleDeclaration">Rebanho Bovino Atual Existente</p>
        <div className="CurrentCattleHerd-RA">
          {" "}
          <div className="Block-CurrentCattleHerd-RA">
            {" "}
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              {" "}
              {/*blocos pequenos do rebanho bovino atual existente*/}
              Bezerros
              <br />
              (de 0 à 6 meses)
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.bezerros.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.bezerros.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              Desmamados
              <br />
              (de 7 à 12 meses)
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.desmamados.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.desmamados.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              Garrotes
              <br />
              (de 13 à 24 meses)
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.garrotes.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.garrotes.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              Novilhos
              <br />
              (de 25 à 36 meses)
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.novilhos.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.novilhos.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p className="SmallBlocks-CurrentCattleHerd-RA">
              Acima de <br /> (36 meses)
              <br />
            </p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.outros.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.outros.female}
            </div>
          </div>
          <div className="Block-CurrentCattleHerd-RA">
            <p id="total-RA">Total de Bovinos</p>
            <div className="MF-RA">
              <p className="M-txt-RA">Macho</p>
              <p className="F-txt-RA">Fêmea</p>
            </div>
            <div className="FieldMF-alt-Left-RA">
              {report.rebanhoAtual.total.male}
            </div>
            <div className="FieldMF-alt-Rigth-RA">
              {report.rebanhoAtual.total.female}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentCattleComponent;
