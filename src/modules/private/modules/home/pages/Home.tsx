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
import { BsPrinter } from "react-icons/bs";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import toast from "react-hot-toast";
import PrintButtonComponent from "../components/PrintButtonComponent";

import "../../../styles/Home.css";
import { ReportHelper } from "../../reports/helpers/ReportHelper";
import { ReportModel } from "../../reports/models/ReportModel";
import { CattleModel } from "../../cattles/models/CattleModel";
import { getMonth } from "date-fns";
import { trackPromise } from "react-promise-tracker";
import { GLOBAL_LOADING_KEY } from "../../../../../constants";

var today = new Date();
var currentYear = today.getFullYear();
var lastYear = today.getFullYear() - 1;
var twoYearsAgo = today.getFullYear() - 2;
var threeYearsAgo = today.getFullYear() - 3;
var fourYearsAgo = today.getFullYear() - 4;
var periodo = [currentYear, lastYear, twoYearsAgo, threeYearsAgo, fourYearsAgo];

const HomePage = (): ReactElement => {
  const [reports, SetReports] = useState<ReportModel[]>([]);

  const reportsHelpers = ReportHelper();

  useEffect(() => {
    trackPromise(
      reportsHelpers.getAllReports().then(SetReports),
      GLOBAL_LOADING_KEY
    );
  }, []);

  const [reportMonth, setReportMonht] = useState<ReportModel>();
  function imprimir() {
    window.print();
  }

  // const getMonth = () => {
  //   if(reportMonth?.createdAt){
  //     reportMonth()+ 1
  //   }
  // };
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
                    {reports.map((reports, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {/* {reports.} */}
                          {reports.createdAt.toDate().getDate()}/
                          {reports.createdAt?.toDate().getMonth() + 1}/
                          {reports.createdAt?.toDate().getFullYear()}
                        </TableCell>
                        <TableCell align="center">
                          {reports.rebanhoAtual.bezerros.male +
                            reports.rebanhoAtual.bezerros.female}
                        </TableCell>
                        <TableCell align="center">
                          {reports.rebanhoAtual.desmamados.male +
                            reports.rebanhoAtual.desmamados.female}
                        </TableCell>
                        <TableCell align="center">
                          {reports.rebanhoAtual.garrotes.male +
                            reports.rebanhoAtual.garrotes.female}
                        </TableCell>
                        <TableCell align="center">
                          {reports.rebanhoAtual.novilhos.male +
                            reports.rebanhoAtual.novilhos.female}
                        </TableCell>
                        <TableCell align="center">
                          {reports.rebanhoAtual.outros.male +
                            reports.rebanhoAtual.outros.female}
                        </TableCell>
                        <TableCell align="center">
                          {reports.rebanhoAtual.total.male +
                            reports.rebanhoAtual.total.female}
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
