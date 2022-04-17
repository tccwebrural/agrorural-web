import { Box, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { FarmModel } from "modules/private/models/FarmModel";
import React, { ReactElement } from "react";
import { CattleHelper } from "../helpers/CattleHelper";
import {
  CattleDethTypes,
  CattleSexs,
  CattleTypes,
} from "../models/CattleModel";

const CattleFormPage = (): ReactElement => {
  const cattlehelpers = CattleHelper();

  const cattle = {
    // id: "",
    birthday: Timestamp.now(),
    name: "animal de 4 patas",
    qtyChildren: 10,
    sex: CattleSexs.MACHO,
    type: CattleTypes.CORTE,
    weigth: 100,
    // createdAt: Timestamp.now(),
    // deathBy: CattleDethTypes.CONSUMO_PROPRIO,
  };

  const createAnimal = () => {
    cattlehelpers.createCattle(cattle);
  };

  // const getAnimal = () => {
  //   cattlehelpers.getAllCattles();
  // };
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">CattleForm</Typography>
      <button onClick={createAnimal}> ok</button>
    </Box>
  );
};

export default CattleFormPage;
