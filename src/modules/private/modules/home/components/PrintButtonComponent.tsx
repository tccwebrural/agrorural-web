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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";
import { ReportModel } from "../../reports/models/ReportModel";
import { ReportHelper } from "../../reports/helpers/ReportHelper";

const PrintButtonComponent = (): ReactElement => {
  // var periodo = [
  //   currentYear,
  //   lastYear,
  //   twoYearsAgo,
  //   threeYearsAgo,
  //   fourYearsAgo,
  // ];

  // function createData(
  //   periodo: Number,
  //   totalBezerros = 10,
  //   totalDesmamados = 0,
  //   totalGarrotes = 0,
  //   totalNovilhos = 0,
  //   totalAcimaDe36 = 0
  // ) {
  //   const totalDeAnimais =
  //     totalBezerros +
  //     totalDesmamados +
  //     totalGarrotes +
  //     totalNovilhos +
  //     totalAcimaDe36;
  //   return {
  //     periodo,
  //     totalBezerros,
  //     totalDesmamados,
  //     totalGarrotes,
  //     totalNovilhos,
  //     totalAcimaDe36,
  //     totalDeAnimais,
  //   };
  // }
  // const totalDeAnimais =
  //   totalBezerros +
  //   totalDesmamados +
  //   totalGarrotes +
  //   totalNovilhos +
  //   totalAcimaDe36;
  // const rows = [
  //   createData(
  //     periodo[0],
  //     totalBezerros,
  //     totalDesmamados,
  //     totalGarrotes,
  //     totalNovilhos,
  //     totalAcimaDe36
  //   ),
  // ];

  const doc = new jsPDF();
  //   const docAuto = new autoTable(doc, autoTable);

  const [reports, setReports] = useState<ReportModel[]>([]);

  const reportHelpers = ReportHelper();
  useEffect(() => {
    reportHelpers.getAllReports().then(setReports);
  }, []);

  reports.map(
    (report, i) =>
      (i =
        report.rebanhoAtual.bezerros.male + report.rebanhoAtual.bezerros.female)
  );

  var total = reports.reduce((sum, el) => sum + el.rebanhoAtual.total.male, 0);
  const Print = () => {
    doc.text("Meu Relátorio", 20, 10);
    autoTable(doc, {
      head: [
        [
          "Periodo",
          "Bezerros",
          "Desmamados",
          "Garrotes",
          "Novilhos",
          "Acimas de 36",
          "total",
        ],
      ],
      // body: [
      //   [reports.map((reports, i) => reports.rebanhoAtual.bezerros.male)],

      // ],
      body: [
        ...reports.map((el) => [
          2022,
          el.rebanhoAtual.bezerros.male + el.rebanhoAtual.bezerros.female,
          el.rebanhoAtual.desmamados.male + el.rebanhoAtual.desmamados.female,
          el.rebanhoAtual.garrotes.male + el.rebanhoAtual.garrotes.female,
          el.rebanhoAtual.novilhos.male + el.rebanhoAtual.novilhos.female,
          el.rebanhoAtual.outros.male + el.rebanhoAtual.outros.female,
          el.rebanhoAtual.total.male + el.rebanhoAtual.total.female,
        ]),
        {
          content: "Text",
          colSpan: 5,
          rowSpan: 5,
        },
        // [
        //   {
        //     content: `Total = ${total}`,
        //     colSpan: 2,
        //     styles: { fillColor: [239, 154, 154] },
        //   },
        // ],
      ],
    });

    // autoTable(doc, {: "#Block-MyReports" });
    doc.save("Meu Relátorio.pdf");
  };
  return (
    <>
      <abbr title="Imprimir">
        <Fab id="icone-imprimir-Home" onClick={Print}>
          <BsPrinter size={20} />
        </Fab>
      </abbr>

      {/* <Box id="Block-MyReports">
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
                    Acima de <p className="Itens-txt-caption">de 36 meses </p>
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
                    <TableCell align="center">{row.totalBezerros}</TableCell>
                    <TableCell align="center">{row.totalDesmamados}</TableCell>
                    <TableCell align="center">{row.totalGarrotes}</TableCell>
                    <TableCell align="center">{row.totalNovilhos}</TableCell>
                    <TableCell align="center">{row.totalAcimaDe36}</TableCell>
                    <TableCell align="center">{row.totalDeAnimais}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box> */}
    </>
  );
};

export default PrintButtonComponent;
