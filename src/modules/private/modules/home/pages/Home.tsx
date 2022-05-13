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

var  today = new Date();
var currentYear = today.getFullYear();
var lastYear = today.getFullYear()-1;
var twoYearsAgo = today.getFullYear()-2;
var threeYearsAgo = today.getFullYear()-3;
var fourYearsAgo = today.getFullYear()-4;
var periodo = [currentYear,lastYear,twoYearsAgo,threeYearsAgo,fourYearsAgo];

const HomePage = (): ReactElement => {
function createData(
  periodo: Number,
  bezerros: number,
  desmamados: number,
  garrotes: number,
  novilhos: number,
  acimaDe: number,
  total: number
) {  return { periodo, bezerros, desmamados, garrotes, novilhos, acimaDe, total };}
const rows = [
  createData(periodo[0], 159, 6.0, 24, 4.0, 10, 150),
  createData(periodo[1], 237, 9.0, 37, 4.3, 10, 150),
  createData(periodo[2], 262, 16.0, 24, 6.0, 10, 150),
  createData(periodo[3], 305, 3.7, 67, 4.3, 10, 150),
 
];

const getAgeFromDate = (date: string) => {
    var today = new Date();
    var birthDate = new Date(date);
    var months;
    months = ( today.getFullYear() - birthDate.getFullYear() ) * 12;
    months -= birthDate.getMonth() +1 ;
    months += birthDate.getMonth();

    return months <= 0 ? 0 : months;
  };
  
  const cattlehelpers = CattleHelper();
  const loadingHelper = useGlobalLoading();
  const [animals, setAnimals] = useState<CattleModel[]>([]);

  useEffect(() => {
    loadingHelper.startLoading();
    cattlehelpers
      .getAllCattles()
      .then((cattles) => {
        const listToDisplay: any[] = [];

        for (let index = 0; index < cattles.length; index++) {
          const cattle = cattles[index];
          const cattleToGetAge = {age: getAgeFromDate(cattle.birthday)};

          let bezerros = 0;
          let desmamados = 0;
          let garrotes = 0;
          let novilhos = 0;
          let acimaDe = 0;
          
          
          if(cattleToGetAge.age >= 0 && cattleToGetAge.age <= 6){
            for(var cont=0; cont<cattles.length; cont++){
              bezerros++;
            
            }
          }else if(cattleToGetAge.age > 6 && cattleToGetAge.age <= 12){
            for(var cont=0; cont < cattles.length; cont++){
              desmamados++;
            }
          }else if(cattleToGetAge.age > 12 && cattleToGetAge.age <= 24){
            for(var cont=0; cont<cattles.length; cont++){
              garrotes++;
            }
          }else if(cattleToGetAge.age > 24 && cattleToGetAge.age <= 36){
            for(var cont=0; cont<cattles.length; cont++){
              novilhos++;
            }
          }else if(cattleToGetAge.age > 36){
            for(var cont=0; cont<cattles.length; cont++){
              acimaDe++;
            }
          }
         var total = bezerros + desmamados + garrotes + novilhos + acimaDe;
        
          const cattleToDisplay = {
            id: cattle.id,
            periodo: periodo,
            // Exemplo 3 de como mudar o valor para exibir
            bezerros: bezerros,
            // Exemplo 4 de como mudar o valor para exibir
            desmamados: desmamados,
            garrotes: garrotes,
            novilhos: novilhos,
            acimaDe: acimaDe,
            total:total
          };
         
          listToDisplay.push(cattleToDisplay);
        }
        setAnimals(listToDisplay);
        loadingHelper.stopLoading();
      })
      .catch((err: any) => {
        toast.error(err);
        loadingHelper.stopLoading();
      });
  }, []);

  


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
