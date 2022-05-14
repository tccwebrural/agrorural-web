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
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { useAuth } from "../../../../../providers/AuthProvider";
import "../../../styles/Home.css";
import { BsPrinter } from "react-icons/bs";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { CattleModel, CATTLE_TYPES } from "../../cattles/models/CattleModel";
import toast from "react-hot-toast";

var today = new Date();
var currentYear = today.getFullYear();
var lastYear = today.getFullYear() - 1;
var twoYearsAgo = today.getFullYear() - 2;
var threeYearsAgo = today.getFullYear() - 3;
var fourYearsAgo = today.getFullYear() - 4;
var periodo = [currentYear, lastYear, twoYearsAgo, threeYearsAgo, fourYearsAgo];

const HomePage = (): ReactElement => {
  const getAgeFromDate = (date: string) => {
    var today = new Date();
    var birthDate = new Date(date);
    var months;
    months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth() + 1;
    months += birthDate.getMonth();

    return months <= 0 ? 0 : months;
  };

  const cattlehelpers = CattleHelper();
  const loadingHelper = useGlobalLoading();
  const [animals, setAnimals] = useState<CattleModel[]>([]);
  var [totalBezerros, setTotalBezerros] = useState(0);
  var [totalDesmamados, setTotalDesmamados] = useState(0);
  var [totalGarrotes, setTotalGarrotes] = useState(0);
  var [totalNovilhos, setTotalNovilhos] = useState(0);
  var [totalAcimaDe36, setTotalAcimaDe36] = useState(0);
  var totalDeAnimais = 0;

  useEffect(() => {
    loadingHelper.startLoading();
    cattlehelpers
      .getAllCattles()
      .then((cattles) => {
        const listToDisplay: any[] = [];

        for (let index = 0; index < cattles.length; index++) {
          const cattle = cattles[index];
          const cattleToGetAge = { age: getAgeFromDate(cattle.birthday) };

          if (cattleToGetAge.age >= 0 && cattleToGetAge.age <= 6) {
            setTotalBezerros((totalBezerros += 1));
          } else if (cattleToGetAge.age > 6 && cattleToGetAge.age <= 12) {
            setTotalDesmamados((totalDesmamados += 1));
          }

          if (cattleToGetAge.age >= 13 && cattleToGetAge.age <= 24) {
            setTotalGarrotes((totalGarrotes += 1));
          }
          if (cattleToGetAge.age > 24 && cattleToGetAge.age <= 36) {
            setTotalNovilhos((totalNovilhos += 1));
          } else if (cattleToGetAge.age > 36) {
            setTotalAcimaDe36((totalAcimaDe36 += 1));
          }
        }

        loadingHelper.stopLoading();
        return {
          totalBezerros,
          totalDesmamados,
          totalGarrotes,
          totalNovilhos,
          totalAcimaDe36,
        };
      })
      .catch((err: any) => {
        toast.error(err);
        loadingHelper.stopLoading();
      });
  }, []);
  console.log("Bezerros: " + totalBezerros);
  console.log("Desmamados: " + totalDesmamados);
  console.log("Garrotes: " + totalGarrotes);
  console.log("Novilhos: " + totalNovilhos);
  console.log("A cima de 36 meses: " + totalAcimaDe36);

  function createData(
    periodo: Number,
    totalBezerros = 0,
    totalDesmamados = 0,
    totalGarrotes = 0,
    totalNovilhos = 0,
    totalAcimaDe36 = 0,
    totalDeAnimais = 0
  ) {
    return {
      periodo,
      totalBezerros,
      totalDesmamados,
      totalGarrotes,
      totalNovilhos,
      totalAcimaDe36,
      totalDeAnimais,
    };
  }

  const rows = [
    createData(
      periodo[0],
      totalBezerros,
      totalDesmamados,
      totalGarrotes,
      totalNovilhos,
      totalAcimaDe36,
      totalDeAnimais
    ),
  ];
  function imprimir() {
    window.print();
  }

  return (
    <>
      <main>
        <div id="MainBlock-HomePrivate">
          <div id="blocoTitulo-criacao-home">
            <h2 id="blocoTituloTxt-criacao-home">Meu Relatorio</h2>
            <span id="blocoTituloLine-vacina-home">
              <abbr title="Imprimir">
                <Fab id="icone-imprimir-Home" onClick={imprimir}>
                  <BsPrinter size={20} />
                </Fab>
              </abbr>
            </span>
          </div>
          <Box id="Block-MyReports">
            <div>
              <TableContainer
                id="Table-MyReports"
                component={Paper}
                style={{
                  border: "none",
                  width: 1025,
                  boxShadow: " 2px 2px 4px 2px var(--cor111)",
                }}
              >
                <Table style={{ maxWidth: 1000 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          color: "var(--cor005)",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        Período
                      </TableCell>
                      <TableCell
                        style={{
                          color: "var(--cor005)",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        Bezerros
                        <p className="Itens-txt-caption">de 0 à 6 meses</p>
                      </TableCell>
                      <TableCell
                        style={{
                          color: "var(--cor005)",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        Desmamados
                        <p className="Itens-txt-caption">de 7 à 12 meses</p>
                      </TableCell>
                      <TableCell
                        style={{
                          color: "var(--cor005)",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        Garrotes
                        <p className="Itens-txt-caption">de 13 à 24 meses</p>
                      </TableCell>
                      <TableCell
                        style={{
                          color: "var(--cor005)",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        Novilhos
                        <p className="Itens-txt-caption">de 25 à 36 meses</p>
                      </TableCell>
                      <TableCell
                        style={{
                          color: "var(--cor005)",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        Acima de{" "}
                        <p className="Itens-txt-caption">de 36 meses </p>
                      </TableCell>
                      <TableCell
                        style={{
                          color: "var(--cor005)",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        TOTAL
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row.periodo}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalBezerros}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalDesmamados}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalGarrotes}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalNovilhos}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalAcimaDe36}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalDeAnimais}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        </div>
      </main>
    </>
  );
};

export default HomePage;
