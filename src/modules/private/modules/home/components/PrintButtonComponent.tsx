import { Fab } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import "../../../styles/Home.css";
import { BsPrinter } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";
import { ReportModel } from "../../reports/models/ReportModel";
import { ReportHelper } from "../../reports/helpers/ReportHelper";

const PrintButtonComponent = (): ReactElement => {
  const doc = new jsPDF();

  const [reports, setReports] = useState<ReportModel[]>([]);

  const reportHelpers = ReportHelper();
  useEffect(() => {
    reportHelpers.getAllReports().then(setReports);
  }, []);

  const Print = () => {
    doc.text("Meu relátorio", 85, 10);

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
      columnStyles: {
        text: {
          cellWidth: "auto",
        },
      },

      body: [
        ...reports.map((el) => [
          el.createdAt.toDate().toLocaleDateString(),
          // (el.createdAt.toDate().getMonth() + 1),

          el.rebanhoAtual.bezerros.male + el.rebanhoAtual.bezerros.female,
          el.rebanhoAtual.desmamados.male + el.rebanhoAtual.desmamados.female,
          el.rebanhoAtual.garrotes.male + el.rebanhoAtual.garrotes.female,
          el.rebanhoAtual.novilhos.male + el.rebanhoAtual.novilhos.female,
          el.rebanhoAtual.outros.male + el.rebanhoAtual.outros.female,
          el.rebanhoAtual.total.male + el.rebanhoAtual.total.female,
        ]),
      ],
    });

    doc.save("Meu Relátorio.pdf");
  };
  return (
    <>
      <abbr title="Exportar Relatório">
        <Fab id="icone-imprimir-Home" onClick={Print}>
          <BsPrinter size={20} />
        </Fab>
      </abbr>
    </>
  );
};

export default PrintButtonComponent;
