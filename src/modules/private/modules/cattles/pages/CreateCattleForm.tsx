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

import { DocumentReference, Timestamp } from "firebase/firestore";
import React, { ReactElement, useState } from "react";
import { CattleHelper } from "../helpers/CattleHelper";
import { CattleModel } from "../models/CattleModel";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import bezerro from "../../../../../assets/bezerro.png";
import "../../../styles/CattleForm.css";
import "../../../styles/style.css";

import { getControls } from "../../../../../utils/FormUtils";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TodayTwoTone } from "@mui/icons-material";
import { object } from "yup/lib/locale";
import { CattleValidatorSchema } from "modules/private/modules/cattles/validators/CattleValidatorSchema";
import { getFireError } from "utils/HandleFirebaseError";
import { ReportHelper } from "../../reports/helpers/ReportHelper";
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

  const reportHelpers = ReportHelper();
  reportHelpers.getAllReports();

  console.log(reportHelpers.getAllReports());
  const navigate = useNavigate();

  const formCattle = useFormik({
    initialValues: {
      identifier: 1,
      weigth: 0,
      name: "",
      type: 1,
      birthday: "",
      sex: 1,
      qtyChildren: 0,
    },

    validationSchema: CattleValidatorSchema,

    onSubmit: async (formValue: CattleModel) => {
      cattlehelpers
        .createCattle(formValue)
        .then(() => {
          navigate("/private/cattles");
          toast.success(`Animal cadastrado com sucesso!`);
        })

        .catch((err) => {
          //TODO: Mensagem de erro
          //toast erro
          console.error(err);
          toast.error(getFireError(err));
        });
    },
  });
  const today = new Date().toLocaleDateString();
  console.log(today);

  return (
    <>
      <div className="MainBlock">
        <div className="Block-Txt-Line">
          <h2 className="Block-Line">
            {/* <span className="Block-Txt">Minha Criação &gt; Cadastrar Gado</span> */}
            <span className="Block-Txt">Cadastrar Animal</span>
          </h2>
        </div>

        <form onSubmit={formCattle.handleSubmit}>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "33ch" } }}>
            <Grid id="CattleForm">
              <FormControl sx={{ m: 1, minWidth: 150 }}>
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
                // inputProps={{ min: 1 }}
                {...getControls(formCattle, "identifier")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 218 }}
              />
              <TextField
                label="Nome do Animal "
                type="text"
                {...getControls(formCattle, "name")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 295 }}
              />
              <TextField
                label="Peso Aproximadamente em Kg"
                type="number"
                {...getControls(formCattle, "weigth")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Data de Nascimento"
                type="date"
                sx={{ m: 1, minWidth: 335 }}
                inputProps={{
                  min: "2000-01-01",
                  // max: "2022-05-06",
                  // max: "2022-05-05",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                // name="birthday"
                {...getControls(formCattle, "birthday")}
              />
              <FormControl sx={{ m: 1, minWidth: 330 }}>
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
                // disabled
                label="Quantidade de cria"
                type="number"
                // name="identifier"
                {...getControls(formCattle, "qtyChildren")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 310 }}
              />

              <Stack direction="row" spacing={2}>
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
                      sx={{ paddingLeft: 3.5, paddingRight: 3.5 }}
                      type="submit"
                    >
                      Salvar
                    </Button>
                  </div>
                </Stack>
              </Stack>
            </Grid>
          </Box>
        </form>
      </div>
    </>
  );
};

export default CreateCattleFormPage;
