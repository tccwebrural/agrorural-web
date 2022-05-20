import { Button } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const GeneratePdf = (): ReactElement => {
  const GeneratorPDf = () => {
    var doc = new jsPDF("p", "pt");

    // doc.text(10, 20, "This is the first title.");

    doc.setFont("helvetica");
    doc.setFont("normal");
    // doc.text(20, 60, "This is the second title.");

    doc.setFont("helvetica");
    doc.setFont("normal");
    // doc.text(20, 100, "This is the thrid title.");
  };

  return (
    <>
      <Button type="submit" onClick={GeneratorPDf}>
        IMPRIMIR
      </Button>
    </>
  );
};

export default GeneratePdf;
