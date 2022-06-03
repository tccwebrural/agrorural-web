import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TableBody,
  Paper,
  Fab,
  Button,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { useAuth } from "../../../../../providers/AuthProvider";
import "../../../styles/Home.css";
import { BsPrinter } from "react-icons/bs";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import {
  CattleModel,
  CATTLE_SEXS,
  CATTLE_TYPES,
} from "../../cattles/models/CattleModel";
import toast from "react-hot-toast";
import { ReportModel, ReportCattle } from "../models/ReportModel";
import { Agent } from "https";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { CompressOutlined } from "@mui/icons-material";
import { MALE, FEMALE } from "../../../../../constants";
var today = new Date();
var currentYear = today.getFullYear();
var lastYear = today.getFullYear() - 1;
var twoYearsAgo = today.getFullYear() - 2;
var threeYearsAgo = today.getFullYear() - 3;
var fourYearsAgo = today.getFullYear() - 4;
var periodo = [currentYear, lastYear, twoYearsAgo, threeYearsAgo, fourYearsAgo];

const ReportComponentCreate = (): ReactElement => {
  const [cattlesCattegory, setCattlesCattegory] = useState<ReportCattle>({
    bezerros: {
      male: 1,
      female: 2,
    },
    desmamados: { male: 1, female: 2 },
    garrotes: { male: 1, female: 2 },
    novilhos: { male: 0, female: 0 },
    outros: { male: 0, female: 0 },
    total: { male: 0, female: 0 },
  });

  const [category, setCattegory] = useState<ReportCattle>();
  const cattlehelpers = CattleHelper();
  const loadingHelper = useGlobalLoading();
  const [animals, setAnimals] = useState<CattleModel[]>([]);

  var totatalBezerros_Mache = 0;
  var desmamadosMacho = 0;
  var garrotesMacho = 0;
  var nascimentoMacho = 0;
  var novilhosMacho = 0;
  var totalMacho = 0;
  var bezerroMacho = 0;
  var bezerroFemea = 0;

  var desmamadosFemea = 0;
  var garrotesFemea = 0;
  var nascimentoFemea = 0;
  var novilhosFemea = 0;
  var totalFemea = 0;
  var outroMachos = 0;
  var outrosFemea = 0;
  var totalCattle = 0;
  var total = 0;

  var [cattlesR, setCattle] = useState(0);

  useEffect(() => {
    loadingHelper.startLoading();
    cattlehelpers
      .getAllCattles()
      .then((cattles) => {
        for (let index = 0; index < cattles.length; index++) {
          totalCattle++;
          const cattle = cattles[index];
          const getMonthFromCattle = { age: getAgeFromDate(cattle.birthday) };

          if (cattle.sex === MALE) {
            if (getMonthFromCattle.age === 0 && getMonthFromCattle.age <= 6) {
              totalCattle += 1;
              setCattle((cattlesR += 1));
              setCattlesCattegory(cattlesCattegory);
            } else if (
              getMonthFromCattle.age > 6 &&
              getMonthFromCattle.age <= 12
            ) {
              setCattle((cattlesR += 1));
            } else if (
              getMonthFromCattle.age > 12 &&
              getMonthFromCattle.age <= 24
            ) {
              for (var cont = 0; cont <= 2; cont++) {
                setCattle((cattlesR += 1));
              }
            } else if (
              getMonthFromCattle.age > 24 &&
              getMonthFromCattle.age <= 36
            ) {
              setCattle((cattlesR += 1));
            }
          }

          if (cattle.sex === FEMALE) {
            if (getMonthFromCattle.age === 0 && getMonthFromCattle.age <= 6) {
              totalCattle += 1;
              setCattle((cattlesR += 1));
              //   setCattlesCattegory((cattlesCattegory.bezerros.male += 1));
            } else if (
              getMonthFromCattle.age > 6 &&
              getMonthFromCattle.age <= 12
            ) {
              setCattle((cattlesR += 1));
            } else if (
              getMonthFromCattle.age > 12 &&
              getMonthFromCattle.age <= 24
            ) {
              setCattle((cattlesR += 1));
            } else if (
              getMonthFromCattle.age > 24 &&
              getMonthFromCattle.age <= 36
            ) {
              setCattle((cattlesR += 1));
            }
          }

          loadingHelper.stopLoading();
        }
        console.log("QUANTIDADE DE BEZERROS FEMEAS: " + cattlesCattegory);
        total = totalCattle;

        console.log(total);
      })
      .catch((err: any) => {
        toast.error(err);
        loadingHelper.stopLoading();
      });
  }, []);

  //   const getReports = () => {
  //     useEffect(() => {
  //       loadingHelper.startLoading();
  //       cattlehelpers
  //         .getAllCattles()
  //         .then((cattles) => {
  //           const listToDisplay: any[] = [];
  //           //   for (let index = 0; index < cattles.length; index++) {
  //           //     const cattle = cattles[index];

  //           //   }
  //           for (let index = 0; index < cattles.length; index++) {
  //             const cattle = cattles[index];
  //             const cattleToGeTSex = cattle.sex;

  //             const cattleToGetAge = { age: getAgeFromDate(cattle.birthday) };

  //             if (cattleToGetAge.age === 264) {
  //               return console.log("passou");
  //             } else {
  //               console.log("reprovou");
  //             }

  //             if (cattleToGetAge.age >= 0 && cattleToGetAge.age <= 6) {
  //               if (cattleToGeTSex === 1) {
  //                 bezerroMacho += 1;
  //               }
  //               if (cattleToGeTSex === 2) {
  //                 bezerroFemea += 1;
  //               }
  //               //
  //             }

  //             if (cattleToGetAge.age > 6 && cattleToGetAge.age <= 12) {
  //               if (cattleToGeTSex === 1) {
  //                 desmamadosMacho += 1;
  //               }
  //               if (cattleToGeTSex === 2) {
  //                 desmamadosFemea += 1;
  //               }
  //               //
  //             }

  //             if (cattleToGetAge.age > 12 && cattleToGetAge.age <= 24) {
  //               if (cattleToGeTSex === 1) {
  //                 for (var cont = 0; cont <= 10; cont++) {
  //                   garrotesMacho++;
  //                 }
  //               }
  //               if (cattleToGeTSex === 2) {
  //                 garrotesFemea += 1;
  //               }
  //               //
  //             }

  //             if (cattleToGetAge.age > 24 && cattleToGetAge.age <= 36) {
  //               if (cattleToGeTSex === 1) {
  //                 novilhosMacho += 1;
  //               }
  //               if (cattleToGeTSex === 2) {
  //                 novilhosFemea += 1;
  //               }
  //               //
  //             }

  //             if (cattleToGetAge.age > 36) {
  //               if (cattleToGeTSex === 1) {
  //                 outroMachos += 1;
  //               }
  //               if (cattleToGeTSex === 2) {
  //                 outrosFemea += 1;
  //               }
  //               console.log("AQUI É UM ANIMAL 22 : " + garrotesMacho);
  //             }
  //             setAnimals(listToDisplay);
  //             loadingHelper.stopLoading();
  //           }
  //         })

  //         .catch((err: any) => {
  //           toast.error(err);
  //           loadingHelper.stopLoading();
  //         });
  //     }, []);
  //   };

  const getAgeFromDate = (date: string) => {
    var birthDate = new Date(date);
    var today = new Date();
    var birthDate_year = birthDate.getFullYear();
    var today_year = today.getFullYear();
    var birthDate_month = birthDate.getMonth();
    var today_month = today.getMonth();
    return (
      today_month + 12 * today_year - (birthDate_month + 12 * birthDate_year)
    );
  };

  function imprimir() {
    window.print();
  }

  return (
    <>
      {/* {animals.map((animals, index) => (
       
      ))} */}
      <div
        //   key={index}
        className="CurrentCattleHerd"
      >
        {" "}
        {/*rebanho bovino atual */}
        <div className="Block-CurrentCattleHerd">
          {" "}
          {/*bloco rebanho bovino atual */}
          <p className="SmallBlocks-CurrentCattleHerd">
            {" "}
            {/*blocos pequenos do rebanho bovino atual existente*/}
            Nascimento
            <br />
            (de 0 à 6 meses)
          </p>
          <div className="MF">
            <p className="M-txt">Macho</p>
            <p className="F-txt">Fêmea</p>
          </div>
          <div className="FieldMF-alt-Left">1</div>
          <div className="FieldMF-alt-Rigth">1</div>
        </div>
        <div className="Block-CurrentCattleHerd">
          <p className="SmallBlocks-CurrentCattleHerd">
            Animais Desmamados
            <br />
            (de 7 à 12 meses)
          </p>
          <div className="MF">
            <p className="M-txt">Macho</p>
            <p className="F-txt">Fêmea</p>
          </div>
          <div className="FieldMF-alt-Left"></div>
          <div className="FieldMF-alt-Rigth"></div>
        </div>
        <div className="Block-CurrentCattleHerd">
          <p className="SmallBlocks-CurrentCattleHerd">
            Garrotes
            <br />
            (de 13 à 24 meses)
          </p>
          <div className="MF">
            <p className="M-txt">Macho</p>
            <p className="F-txt">Fêmea</p>
          </div>
          <div className="FieldMF-alt-Left"> </div>
          <div className="FieldMF-alt-Rigth"></div>
        </div>
        <div className="Block-CurrentCattleHerd">
          <p className="SmallBlocks-CurrentCattleHerd">
            Novilhos
            <br />
            (de 25 à 36 meses)
          </p>
          <div className="MF">
            <p className="M-txt">Macho</p>
            <p className="F-txt">Fêmea</p>
          </div>
          <div className="FieldMF-alt-Left"></div>
          <div className="FieldMF-alt-Rigth"></div>
        </div>
        <div className="Block-CurrentCattleHerd">
          <p id="total">Total de Bovinos</p>
          <div className="MF">
            <p className="M-txt">Macho</p>
            <p className="F-txt">Fêmea</p>
          </div>
          <div className="FieldMF-alt-Left"></div>
          <div className="FieldMF-alt-Rigth"></div>
        </div>
      </div>
    </>
  );
};

export default ReportComponentCreate;
