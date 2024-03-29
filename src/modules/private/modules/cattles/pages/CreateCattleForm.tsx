import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import { ReactElement } from "react";
import bezerro from "../../../../../assets/bezerro.png";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import { CattleHelper } from "../helpers/CattleHelper";
import { CattleModel } from "../models/CattleModel";

import toast from "react-hot-toast";
import { getControls } from "../../../../../utils/FormUtils";

import { useFormik } from "formik";
import { CattleValidatorSchema } from "modules/private/modules/cattles/validators/CattleValidatorSchema";
import { Link, useNavigate } from "react-router-dom";
import { getFireError } from "utils/HandleFirebaseError";

import "../../../styles/CattleForm.css";
import "../../../styles/style.css";
import { useNotification } from "providers/NotificationProvider";

const CreateCattleFormPage = (): ReactElement => {
  const cattlehelpers = CattleHelper();

  const navigate = useNavigate();
  const notifyProvider = useNotification();

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
          notifyProvider.refreshNotifications();
          navigate("/private/cattles");
          toast.success(`Animal cadastrado com sucesso!`);
        })
        .catch((err) => {
          console.error(err);
          toast.error(getFireError(err));
        });
    },
  });

  return (
    <>
      <div id="MainBlock-CreateCattleForm">
        <div id="Block-CowImage-Form">
          <img id="CowImage-Form" src={vaca_com_chifre_andando} alt="vaca" />
        </div>
        <div id="Block-CalfImage-Form">
          <img id="CalfImage-Form" src={bezerro} alt="bezerro" />
        </div>

        <div className="Block-Txt-Line">
          <h2 className="Block-Line">
            <span className="Block-Txt">Cadastrar Animal</span>
          </h2>
        </div>

        <form onSubmit={formCattle.handleSubmit}>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "33ch" } }}>
            <Grid id="CattleForm">
              <TextField
                label="Nome do Animal "
                type="text"
                {...getControls(formCattle, "name")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 285, marginRight: 5 }}
              />
              <TextField
                label="Identificador"
                type="number"
                {...getControls(formCattle, "identifier")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 250, marginRight: 5 }}
              />
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <TextField
                  select
                  {...getControls(formCattle, "sex")}
                  label="Sexo"
                  style={{ width: 244, margin: "0%", marginRight: 11 }}
                >
                  <MenuItem value={1}>MACHO</MenuItem>
                  <MenuItem value={2}>FÊMEA</MenuItem>
                </TextField>
              </FormControl>
              <TextField
                label="Peso Aproximadamente em Kg"
                type="number"
                {...getControls(formCattle, "weigth")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 210, marginLeft: -7, marginTop: 8 }}
              />
              <TextField
                label="Data de Nascimento"
                type="date"
                sx={{ m: 1, minWidth: 340 }}
                InputLabelProps={{
                  shrink: true,
                }}
                {...getControls(formCattle, "birthday")}
              />
              <FormControl sx={{ m: 1, minWidth: 341, marginLeft: 0.7 }}>
                <TextField
                  select
                  {...getControls(formCattle, "type")}
                  label="Tipo"
                  style={{ width: 350, margin: "0%", marginRight: -2 }}
                >
                  <MenuItem value={1}>Gado de Corte</MenuItem>
                  <MenuItem value={2}>Gado Leitero</MenuItem>
                </TextField>
              </FormControl>

              <TextField
                label="Quantidade de cria"
                type="number"
                {...getControls(formCattle, "qtyChildren")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 310 }}
              />

              <Stack direction="row" spacing={2}>
                <Stack spacing={2} direction="row" sx={{ marginRight: 1 }}>
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
