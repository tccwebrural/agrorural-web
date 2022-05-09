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
import React, { ReactElement } from "react";
import { useAuth } from "../../../../../providers/AuthProvider";
import "../../../styles/Home.css";
import { BsPrinter } from "react-icons/bs";

function createData(
  periodo: Number,
  bezerros: number,
  desmamados: number,
  garrotes: number,
  novilhos: number,
  acimaDe: number,
  total: number
) {
  return { periodo, bezerros, desmamados, garrotes, novilhos, acimaDe, total };
}

const rows = [
  createData(2021, 159, 6.0, 24, 4.0, 10, 150),
  createData(2021, 237, 9.0, 37, 4.3, 10, 150),
  createData(2021, 262, 16.0, 24, 6.0, 10, 150),
  createData(2021, 305, 3.7, 67, 4.3, 10, 150),
  createData(2021, 356, 16.0, 49, 3.9, 10, 150),
  createData(2021, 356, 16.0, 49, 3.9, 10, 150),
];

const HomePage = (): ReactElement => {
  const authContext = useAuth();

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
                <Table sx={{ maxWidth: 1000 }}>
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
                        <TableCell align="center">{row.bezerros}</TableCell>
                        <TableCell align="center">{row.desmamados}</TableCell>
                        <TableCell align="center">{row.garrotes}</TableCell>
                        <TableCell align="center">{row.novilhos}</TableCell>
                        <TableCell align="center">{row.acimaDe}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
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
