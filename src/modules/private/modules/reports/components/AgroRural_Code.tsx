import { Box, Fab, Button, Grid, Modal } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import "../../../styles/Home.css";
import { BsPrinter } from "react-icons/bs";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import toast from "react-hot-toast";
import { ReportModel } from "../models/ReportModel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { MALE, FEMALE, CATTLE_IS_LIVE } from "../../../../../constants";
import { ReportHelper } from "../helpers/ReportHelper";
import { useNavigate } from "react-router-dom";
import { getFireError } from "utils/HandleFirebaseError";
import { Timestamp } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
var today = new Date();
var currentYear = today.getFullYear();
var lastYear = today.getFullYear() - 1;
var twoYearsAgo = today.getFullYear() - 2;
var threeYearsAgo = today.getFullYear() - 3;
var fourYearsAgo = today.getFullYear() - 4;

const GenerateCattleReport = (): ReactElement => {
  const loadingHelper = useGlobalLoading();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
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

  const doc = new jsPDF();
  const reportHelpers = ReportHelper();
  const [reports, setReports] = useState<ReportModel[]>([]);

  useEffect(() => {
    reportHelpers.getAllReports().then(setReports);
  }, []);

  const printPdf = () => {
    doc.text("Declare do Rebanho", 80, 10);

    // REBAHO ATUAL MACHOS
    autoTable(doc, {
      body: [
        [
          {
            content: "Rebanho atual existente Machos",
            styles: {
              halign: "center",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      head: [
        [
          "Periodo",
          "Bezerro",
          "Desmamados",
          "Garrotes",
          "Novilhos",
          "Acimas de 36",
          "Total",
        ],
      ],
      theme: "grid",

      bodyStyles: {
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        valign: "middle",
        halign: "center",
      },

      pageBreak: "auto",
      rowPageBreak: "avoid",
      styles: {
        cellWidth: "wrap",

        halign: "justify",
      },

      body: [
        ...reports.map((el) => [
          el.createdAt.toDate().toLocaleDateString(),
          el.rebanhoAtual?.bezerros.male,
          el.rebanhoAtual?.desmamados.male,
          el.rebanhoAtual?.garrotes.male,
          el.rebanhoAtual?.novilhos.male,
          el.rebanhoAtual?.outros.male,
          el.rebanhoAtual?.total.male,
        ]),
      ],
    });

    // REBANHO ATUAL FEMEAS
    autoTable(doc, {
      body: [
        [
          {
            content: "Rebanho atual existente Fêmeas",
            styles: {
              halign: "center",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      head: [
        [
          "Periodo",
          "Bezerro",
          "Desmamados",
          "Garrotes",
          "Novilhos",
          "Acimas de 36",
          "Total",
        ],
      ],

      bodyStyles: {
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        valign: "middle",
        halign: "center",
      },

      pageBreak: "auto",
      rowPageBreak: "avoid",
      styles: {
        cellWidth: "wrap",

        halign: "justify",
      },

      theme: "grid",

      body: [
        ...reports.map((el) => [
          el.createdAt.toDate().toLocaleDateString(),
          el.rebanhoAtual?.bezerros.female,
          el.rebanhoAtual?.desmamados.female,
          el.rebanhoAtual?.garrotes.female,
          el.rebanhoAtual?.novilhos.female,
          el.rebanhoAtual?.outros.female,
          el.rebanhoAtual?.total.female,
        ]),
      ],
    });

    // CONSUMO PROPRIO MACHO
    autoTable(doc, {
      body: [
        [
          {
            content: "Consumo Próprio Macho",
            styles: {
              halign: "center",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      head: [
        [
          "Periodo",
          "Bezerros ",
          "Des mamados ",
          "Garrotes ",
          "Novilhos ",
          "Acimas de 36 ",
          "Total ",
        ],
      ],
      theme: "grid",
      bodyStyles: {
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        valign: "middle",
        halign: "center",
      },

      pageBreak: "auto",
      rowPageBreak: "avoid",
      styles: {
        cellWidth: "wrap",

        halign: "justify",
      },

      body: [
        ...reports.map((el) => [
          el.createdAt.toDate().toLocaleDateString(),
          el.deathByOwnConsuption?.bezerros.male,
          el.deathByOwnConsuption?.desmamados.male,
          el.deathByOwnConsuption?.garrotes.male,
          el.deathByOwnConsuption?.novilhos.male,
          el.deathByOwnConsuption?.outros.male,
          el.deathByOwnConsuption?.total.male,
        ]),
      ],
    });
    // CONSUMO PROPRIO FEMEA
    autoTable(doc, {
      body: [
        [
          {
            content: "Consumo Próprio Fêmea",
            styles: {
              halign: "center",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      head: [
        [
          "Periodo",
          "Bezerros",
          "Desmamados ",
          "Garrotes",
          "Novilhos ",
          "Acimas de 36",
          "Total",
        ],
      ],
      theme: "grid",

      bodyStyles: {
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        valign: "middle",
        halign: "center",
      },
      styles: {
        cellWidth: "wrap",

        halign: "justify",
      },
      pageBreak: "auto",
      rowPageBreak: "avoid",

      body: [
        ...reports.map((el) => [
          // el.createdAt.toDate().getMonth(),
          el.createdAt.toDate().toLocaleDateString(),
          el.deathByOwnConsuption?.bezerros.female,
          el.deathByOwnConsuption?.desmamados.female,
          el.deathByOwnConsuption?.garrotes.female,
          el.deathByOwnConsuption?.novilhos.female,
          el.deathByOwnConsuption?.outros.female,
          el.deathByOwnConsuption?.total.female,
        ]),
      ],
    });

    // CAUSA DIVERSA MACHO
    autoTable(doc, {
      body: [
        [
          {
            content: "Causas diversas Machos",
            styles: {
              halign: "center",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      head: [
        [
          "Periodo",
          "Bezerros",
          "Desmamados",
          "Garrotes",
          "Novilhos",
          "Acimas de 36",
          "Total",
        ],
      ],
      theme: "grid",
      bodyStyles: {
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        valign: "middle",
        halign: "center",
      },

      styles: {
        cellWidth: "wrap",

        halign: "justify",
      },

      body: [
        ...reports.map((el) => [
          el.createdAt.toDate().toLocaleDateString(),
          el.deathByDiversousCases?.bezerros.male,
          el.deathByDiversousCases?.desmamados.male,
          el.deathByDiversousCases?.garrotes.male,
          el.deathByDiversousCases?.novilhos.male,
          el.deathByDiversousCases?.outros.male,
          el.deathByDiversousCases?.total.male,
        ]),
      ],
    });

    // CAUSA DIVERSA FEMEA
    autoTable(doc, {
      body: [
        [
          {
            content: "Causas diversas Fêmea",
            styles: {
              halign: "center",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
      pageBreak: "auto",
      rowPageBreak: "avoid",
    });

    autoTable(doc, {
      head: [
        [
          "Periodo",
          "Bezerros",
          "Desmamados",
          "Garrotes",
          "Novilhos",
          "Acimas de 36",
          "Total",
        ],
      ],
      theme: "grid",
      pageBreak: "auto",
      rowPageBreak: "avoid",

      bodyStyles: {
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        valign: "middle",
        halign: "center",
      },

      styles: {
        cellWidth: "wrap",

        halign: "justify",
      },

      body: [
        ...reports.map((el) => [
          el.createdAt.toDate().toLocaleDateString(),
          el.deathByDiversousCases?.bezerros.female,
          el.deathByDiversousCases?.desmamados.female,
          el.deathByDiversousCases?.garrotes.female,
          el.deathByDiversousCases?.novilhos.female,
          el.deathByDiversousCases?.outros.female,
          el.deathByDiversousCases?.total.female,
        ]),
      ],
    });

    doc.save("Meu Relátorio.pdf");
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

            // ************************CAUSAS DIVERSAS***********************
            if (currentValue.sex === MALE && currentValue.deathBy === 1) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                // previousValues.totalBezerrosM = currentValue.totalBezerrosM + 1;
                previousValues.totalBezerrosCausasDiversasM =
                  previousValues.totalBezerrosCausasDiversasM + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamadosCausasDiversasM =
                  previousValues.totalDesmamadosCausasDiversasM + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotesCausasDiversasM =
                  previousValues.totalGarrotesCausasDiversasM + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhosCausasDiversasM =
                  previousValues.totalNovilhosCausasDiversasM + 1;
              } else {
                previousValues.totalOutrosCausasDiversasM =
                  previousValues.totalOutrosCausasDiversasM + 1;
              }
            } else if (
              currentValue.sex === FEMALE &&
              currentValue.deathBy === 1
            ) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                previousValues.totalBezerrosCausasDiversasF =
                  previousValues.totalBezerrosCausasDiversasF + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamadosCausasDiversasF =
                  previousValues.totalDesmamadosCausasDiversasF + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotesCausasDiversasF =
                  previousValues.totalGarrotesCausasDiversasF + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhosCausasDiversasF =
                  previousValues.totalNovilhosCausasDiversasF + 1;
              } else {
                previousValues.totalOutrosCausasDiversasF =
                  previousValues.totalOutrosCausasDiversasF + 1;
              }
            }
            // *************************************CONSUMO PROPRIO************************************
            if (currentValue.sex === MALE && currentValue.deathBy === 2) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                previousValues.totalBezerrosConsumoProprioM =
                  previousValues.totalBezerrosConsumoProprioM + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamadosConsumoProprioM =
                  previousValues.totalDesmamadosConsumoProprioM + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotesConsumoProprioM =
                  previousValues.totalGarrotesConsumoProprioM + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhosConsumoProprioM =
                  previousValues.totalBezerrosConsumoProprioM + 1;
              } else {
                previousValues.totalOutrosConsumoProprioM =
                  previousValues.totalOutrosConsumoProprioM + 1;
              }
            } else if (
              currentValue.sex === FEMALE &&
              currentValue.deathBy === 2
            ) {
              if (currentValue.age >= 0 && currentValue.age <= 6) {
                previousValues.totalBezerrosConsumoProprioF =
                  previousValues.totalBezerrosConsumoProprioF + 1;
              } else if (currentValue.age > 6 && currentValue.age <= 12) {
                previousValues.totalDesmamadosConsumoProprioF =
                  previousValues.totalDesmamadosConsumoProprioF + 1;
              } else if (currentValue.age >= 13 && currentValue.age <= 24) {
                previousValues.totalGarrotesConsumoProprioF =
                  previousValues.totalGarrotesConsumoProprioF + 1;
              } else if (currentValue.age >= 25 && currentValue.age <= 36) {
                previousValues.totalNovilhosConsumoProprioF =
                  previousValues.totalNovilhosConsumoProprioF + 1;
              } else {
                previousValues.totalOutrosConsumoProprioF =
                  previousValues.totalOutrosConsumoProprioF + 1;
              }
            }
            // ***************************************************************************************
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

            // TOTAL CONSUMO PROPRIO

            previousValues.totalCattlesConsumoProprioMale =
              previousValues.totalOutrosConsumoProprioM +
              previousValues.totalBezerrosConsumoProprioM +
              previousValues.totalDesmamadosConsumoProprioM +
              previousValues.totalGarrotesConsumoProprioM +
              previousValues.totalNovilhosConsumoProprioM;

            previousValues.totalCattlesConsumoProprioFemale =
              previousValues.totalOutrosConsumoProprioF +
              previousValues.totalBezerrosConsumoProprioF +
              previousValues.totalDesmamadosConsumoProprioF +
              previousValues.totalGarrotesConsumoProprioF +
              previousValues.totalNovilhosConsumoProprioF;

            // TOTAL CAUSAS DIVERSAS

            previousValues.totalCattlesCausasDiversasMale =
              previousValues.totalOutrosCausasDiversasM +
              previousValues.totalBezerrosCausasDiversasM +
              previousValues.totalDesmamadosCausasDiversasM +
              previousValues.totalGarrotesCausasDiversasM +
              previousValues.totalNovilhosCausasDiversasM;

            previousValues.totalCattlesCausasDiversasFemale =
              previousValues.totalOutrosCausasDiversasF +
              previousValues.totalBezerrosCausasDiversasF +
              previousValues.totalDesmamadosCausasDiversasF +
              previousValues.totalGarrotesCausasDiversasF +
              previousValues.totalNovilhosCausasDiversasF;

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

            // CONSUMO PROPRIO
            totalBezerrosConsumoProprioM: 0,
            totalDesmamadosConsumoProprioM: 0,
            totalGarrotesConsumoProprioM: 0,
            totalNovilhosConsumoProprioM: 0,
            totalOutrosConsumoProprioM: 0,
            totalCattlesConsumoProprioFemale: 0,
            totalCattlesConsumoProprioMale: 0,
            totalBezerrosConsumoProprioF: 0,
            totalDesmamadosConsumoProprioF: 0,
            totalGarrotesConsumoProprioF: 0,
            totalNovilhosConsumoProprioF: 0,
            totalOutrosConsumoProprioF: 0,

            // CAUSAS DIVERSAS

            totalBezerrosCausasDiversasM: 0,
            totalDesmamadosCausasDiversasM: 0,
            totalGarrotesCausasDiversasM: 0,
            totalNovilhosCausasDiversasM: 0,
            totalOutrosCausasDiversasM: 0,
            totalCattlesCausasDiversasFemale: 0,
            totalCattlesCausasDiversasMale: 0,
            totalBezerrosCausasDiversasF: 0,
            totalDesmamadosCausasDiversasF: 0,
            totalGarrotesCausasDiversasF: 0,
            totalNovilhosCausasDiversasF: 0,
            totalOutrosCausasDiversasF: 0,
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

      // CAUSAS DIVERSAS

      currentReport.deathByDiversousCases.bezerros.male =
        resultado.totalBezerrosCausasDiversasM;
      currentReport.deathByDiversousCases.bezerros.female =
        resultado.totalBezerrosCausasDiversasF;
      currentReport.deathByDiversousCases.desmamados.male =
        resultado.totalDesmamadosCausasDiversasM;
      currentReport.deathByDiversousCases.desmamados.female =
        resultado.totalDesmamadosCausasDiversasF;
      currentReport.deathByDiversousCases.garrotes.male =
        resultado.totalGarrotesCausasDiversasM;
      currentReport.deathByDiversousCases.garrotes.female =
        resultado.totalGarrotesCausasDiversasF;
      currentReport.deathByDiversousCases.novilhos.male =
        resultado.totalNovilhosCausasDiversasM;
      currentReport.deathByDiversousCases.novilhos.female =
        resultado.totalNovilhosCausasDiversasF;
      currentReport.deathByDiversousCases.outros.male =
        resultado.totalOutrosCausasDiversasM;
      currentReport.deathByDiversousCases.outros.female =
        resultado.totalOutrosCausasDiversasF;
      currentReport.deathByDiversousCases.total.male =
        resultado.totalCattlesCausasDiversasMale;
      currentReport.deathByDiversousCases.total.female =
        resultado.totalCattlesCausasDiversasFemale;

      // CONSUMO PROPRIO

      currentReport.deathByOwnConsuption.bezerros.male =
        resultado.totalBezerrosConsumoProprioM;
      currentReport.deathByOwnConsuption.bezerros.female =
        resultado.totalBezerrosConsumoProprioF;
      currentReport.deathByOwnConsuption.desmamados.male =
        resultado.totalDesmamadosConsumoProprioM;
      currentReport.deathByOwnConsuption.desmamados.female =
        resultado.totalDesmamadosConsumoProprioF;
      currentReport.deathByOwnConsuption.garrotes.male =
        resultado.totalGarrotesConsumoProprioM;
      currentReport.deathByOwnConsuption.garrotes.female =
        resultado.totalGarrotesConsumoProprioF;
      currentReport.deathByOwnConsuption.novilhos.male =
        resultado.totalNovilhosConsumoProprioM;
      currentReport.deathByOwnConsuption.novilhos.female =
        resultado.totalNovilhosConsumoProprioF;
      currentReport.deathByOwnConsuption.outros.male =
        resultado.totalOutrosConsumoProprioM;
      currentReport.deathByOwnConsuption.outros.female =
        resultado.totalOutrosConsumoProprioF;
      currentReport.deathByOwnConsuption.total.male =
        resultado.totalCattlesConsumoProprioMale;
      currentReport.deathByOwnConsuption.total.female =
        resultado.totalCattlesConsumoProprioFemale;
      return resultado;
    });

    //...
    const currentReport = report;

    setReport(currentReport);

    loadingHelper.stopLoading();
  }, []);

  const reportHelper = ReportHelper();

  const navigate = useNavigate();

  const submitSave = async () => {
    await reportHelper
      .createReport(report)
      .then(() => {
        toast.success("SUCESSO");
        navigate("/private/home");
      })
      .catch((err) => {
        //TODO: Mensagem de erro
        //toast erro
        navigate("/private/cattles");

        toast.error(getFireError(err));
      });
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 530,
            height: 240,
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: 11,
            p: 4,
          }}
        >
          <div id="bloco-modal-GerarRelatório">
            <Grid sx={{ margin: "2%  2%" }}>
              <span id="txt-GerarRelatorio">Deseja Gerar o Relatório?</span>
              <p id="txt-p-btnGerarRelatório">
                Após gerar o relatório você será capaz de visualizar a
                quantidade total de animais que existe na fazenda separados por
                idade.
              </p>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                justifyContent: "end",
                marginTop: 6,
                marginRight: 2,
              }}
            >
              <Grid
                sx={{
                  marginTop: " -6% ",
                  marginBottom: "15%",
                  borderRadius: "5px",
                  backgroundColor: "rgba(0, 128, 0, 0.795)",
                }}
              >
                <Button onClick={submitSave} style={{ color: "var(--cor001)" }}>
                  Gerar Relatório
                </Button>{" "}
              </Grid>
              <Grid
                sx={{
                  marginTop: " -6% ",
                  marginBottom: "15%",
                  marginLeft: "1%",
                  borderRadius: "5px",
                  backgroundColor: "rgba(255, 0, 0, 0.849)",
                }}
              >
                <Button
                  onClick={handleClose}
                  style={{ color: "var(--cor001)" }}
                >
                  cancelar
                </Button>{" "}
              </Grid>
            </Grid>
          </div>
        </Box>
      </Modal>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        <div id="Block-Txt-Line-CattleDeclaration">
          <h2 id="Block-Txt-CattleDeclaration">Declare do Rebanho</h2>
          <span id="Block-Line-CattleDeclaration">
            <abbr title="Imprimir Declare do Rebanho">
              <Fab id="printIcon" onClick={printPdf}>
                <BsPrinter size={20} />
              </Fab>
            </abbr>
            <abbr title="Gerar Relatório do Animal">
              <Fab id="reportIcon" onClick={handleOpen}>
                <AssignmentIcon style={{ color: "var(--cor001" }} />
              </Fab>
            </abbr>
          </span>
        </div>
      </Box>
    </>
  );
};

export default GenerateCattleReport;
