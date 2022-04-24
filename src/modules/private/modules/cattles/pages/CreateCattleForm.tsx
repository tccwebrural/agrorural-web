import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  TextField,
  Stack,
  Button,
  Paper,
  styled,
} from "@mui/material";

import { Timestamp } from "firebase/firestore";
import { FarmModel } from "modules/private/models/FarmModel";
import React, { ReactElement, useState } from "react";
import { CattleHelper } from "../helpers/CattleHelper";
import {
  CattleDethTypes,
  CattleModel,
  CattleSexs,
  CattleTypes,
} from "../models/CattleModel";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import bezerro from "../../../../../assets/bezerro.png";
import "../../../styles/CattleForm.css";
import "../../../styles/style.css";
import { getControls } from "../../../../../utils/FormUtils";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TodayTwoTone } from "@mui/icons-material";
import { object } from "yup/lib/locale";
import { CattleValidatorSchema } from "modules/public/modules/authentication/validators/CattleValidatorSchema";
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: "auto",
  marginTop: 32,
  maxWidth: 928,
  height: 390,
  borderTop: 2,
}));

const CreateCattleFormPage = (): ReactElement => {
  const cattlehelpers = CattleHelper();

  const navigate = useNavigate();

  const formCattle = useFormik({
    initialValues: {
      identifier: 0,
      weigth: 0,
      name: "",
      type: CattleTypes.CORTE,
      birthday: undefined,
      sex: CattleSexs.MACHO,
      qtyChildren: 0,
    },

    validationSchema: CattleValidatorSchema,
    onSubmit: async (formValue: CattleModel) => {
      // Date.UTC(""),
      // formValue.birthday?.toDate();
      cattlehelpers
        .createCattle(formValue)
        .then(() => navigate("/private/cattles"));
    },
  });
  console.log(formCattle);

  return (
    <>
      <div className="MainBlock">
        <div className="Block-Txt-Line">
          <h2 className="Block-Line">
            {/* <span className="Block-Txt">Minha Criação &gt; Cadastrar Gado</span> */}
            <span className="Block-Txt">Cadastrar Gado</span>
          </h2>
        </div>

        <form onSubmit={formCattle.handleSubmit}>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "33ch" } }}>
            <Grid>
              <Item id="AnimalRegister-Form">
                <FormControl sx={{ m: 1, minWidth: 255 }}>
                  <InputLabel htmlFor="grouped-select">Sexo</InputLabel>

                  <Select
                    {...getControls(formCattle, "sex")}
                    label="Grouping"
                    // name="category"
                  >
                    <MenuItem value={1}>MACHO</MenuItem>
                    <MenuItem value={2}>FÊMEA</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  // disabled
                  label="Identificador"
                  type="number"
                  // name="identifier"
                  {...getControls(formCattle, "identifier")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 268 }}
                />
                <TextField
                  label="Nome do gado "
                  type="text"
                  {...getControls(formCattle, "name")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 340 }}
                />
                <TextField
                  label="Data de Nascimento"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // name="birthday"
                  {...getControls(formCattle, "birthday")}
                />
                <FormControl sx={{ m: 1, minWidth: 270 }}>
                  <InputLabel htmlFor="type">Tipo</InputLabel>
                  <Select
                    {...getControls(formCattle, "type")}
                    label="Grouping"
                    // name="type"
                  >
                    <MenuItem value={1}>Gado de Corte</MenuItem>
                    <MenuItem value={2}>Gado Leitero</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Peso Aproximadamente em Kg"
                  type="number"
                  {...getControls(formCattle, "weigth")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  // disabled
                  label="Quantidade de cria"
                  type="number"
                  // name="identifier"
                  {...getControls(formCattle, "qtyChildren")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 268 }}
                />
                <Stack direction="row" spacing={2}>
                  <Grid container justifyContent="flex-end">
                    <Stack spacing={2} direction="row" sx={{ marginRight: 1 }}>
                      <div id="Block-CowImage-Form">
                        <img
                          id="CowImage-Form"
                          src={vaca_com_chifre_andando}
                          alt="vaca"
                        />
                      </div>
                      <div id="Block-CalfImage-Form">
                        <img id="CalfImage-Form" src={bezerro} alt="bezerro" />
                      </div>
                      <div id="Btns-SaveCancel-Form">
                        <Button
                          sx={{ marginRight: 1 }}
                          variant="contained"
                          color="error"
                          component={Link}
                          to="/private/cattles"
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ paddingTop: 2.3, paddingBottom: 2.3 }}
                          type="submit"
                        >
                          Salvar
                        </Button>
                      </div>
                    </Stack>
                  </Grid>
                </Stack>
              </Item>
            </Grid>
          </Box>
        </form>
      </div>
    </>
  );
};

export default CreateCattleFormPage;
