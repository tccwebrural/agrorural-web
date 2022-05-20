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
import toast from "react-hot-toast";
import PrintButtonComponent from "../components/PrintButtonComponent";

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
  const cattlehelpers = CattleHelper();
  const loadingHelper = useGlobalLoading();
  const [totalBezerros, setTotalBezerros] = useState(0);
  const [totalDesmamados, setTotalDesmamados] = useState(0);
  const [totalGarrotes, setTotalGarrotes] = useState(0);
  const [totalNovilhos, setTotalNovilhos] = useState(0);
  const [totalAcimaDe36, setTotalAcimaDe36] = useState(0);

  function createData(
    periodo: Number,
    totalBezerros = 0,
    totalDesmamados = 0,
    totalGarrotes = 0,
    totalNovilhos = 0,
    totalAcimaDe36 = 0
  ) {
    const totalDeAnimais =
      totalBezerros +
      totalDesmamados +
      totalGarrotes +
      totalNovilhos +
      totalAcimaDe36;
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
      totalAcimaDe36
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
            <h2 id="blocoTituloTxt-criacao-home">Meu Relatório</h2>
            <span id="blocoTituloLine-vacina-home">
              {/* <abbr title="Imprimir">
                <Fab id="icone-imprimir-Home" onClick={imprimir}>
                  <BsPrinter size={20} />
                </Fab>
              </abbr> */}
              {/* COMPONENTE PRINT BUTTON */}
              {PrintButtonComponent()}
            </span>
          </div>
          d
        </div>
      </main>
    </>
  );
};

export default HomePage;
