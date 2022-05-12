import React, { ReactElement, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Checkbox,
} from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
const label = { inputProps: { "aria-label": "" } };
import { MdCoronavirus } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/VacineForm.css";
import { VacineModel } from "../models/VacineModel";
import toast from "react-hot-toast";
import { VacineHelper } from "../helpers/VacineHelpers";
import { Formik, useFormik } from "formik";
import { VacineValidatorSchema } from "../validators/VacineValidatorSchema";
import { CattleModel } from "../../cattles/models/CattleModel";
import vaca1 from "../../../../../assets/vaca1.png";
import { getFireError } from "utils/HandleFirebaseError";
import { getControls } from "utils/FormUtils";

const VaccineFormPagetst = (): ReactElement => {
  const { id } = useParams();

  const navigate = useNavigate();

  const vacineHelper = VacineHelper();

  console.log(id);
  const formVacine = useFormik({
    initialValues: {
      date_application: "",
      expiration_date: "",
      lote: 0,
      manufacturer: "",
      name: "",
    },

    validationSchema: VacineValidatorSchema,

    onSubmit: async (formValue: VacineModel) => {
      if (id) {
        vacineHelper
          .createVacine(id, formValue)
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
      }
    },
  });
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div id="MainBlock-VaccineForm">
          <div className="Block-Txt-Line">
            <h2 className="Block-Line">
              <span className="Block-Txt">Cadastrar Vacina 123333</span>
            </h2>
          </div>
          <div id="Block-AnimalData">
            <form onSubmit={formVacine.handleSubmit}>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  style={{ width: 220 }}
                  label="Nome"
                  type="text"
                  {...getControls(formVacine, "name")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ width: 140 }}
                  label="Lote"
                  type="number"
                  {...getControls(formVacine, "lote")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ width: 200 }}
                  label="Fabricante"
                  type="text"
                  {...getControls(formVacine, "manufacturer")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ width: 180 }}
                  label="Data de Aplicação"
                  type="date"
                  {...getControls(formVacine, "date_application")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ width: 180 }}
                  label="Validade da Vacina"
                  type="date"
                  {...getControls(formVacine, "expiration_date")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <div id="Block-VaccineIcons">
                  <fieldset id="FieldVaccineIcons">
                    <abbr title="Vacina contra doenças">
                      <VaccinesIcon
                        style={{
                          fontSize: 75,
                          marginTop: 10,
                          marginLeft: 35,
                        }}
                      />
                    </abbr>
                    <p id="VacinaIcon-Txt">Vírus 1</p>
                    <Checkbox
                      {...label}
                      sx={{ fontSize: 28, marginLeft: 6.5, marginTop: -1 }}
                    />
                  </fieldset>

                  <fieldset id="FieldVirus">
                    <abbr title="Vacina contra vírus">
                      <MdCoronavirus
                        size={80}
                        style={{ marginTop: 5, marginLeft: 35 }}
                      />
                    </abbr>
                    <p id="VacinaIcon-Txt">Vírus 2</p>
                    <Checkbox
                      {...label}
                      sx={{ fontSize: 28, marginLeft: 6.5, marginTop: -1 }}
                    />
                  </fieldset>
                </div>

                <div id="Block-CowImage-CadastroVacina">
                  <img style={{ width: 300 }} src={vaca1} alt="Erro..." />
                </div>

                <div id="Btns-Add-Cancel-CadastroVacina">
                  <Grid item xs={2} sx={{ margin: 1 }}>
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="error"
                      component={Link}
                      to={`/private/cattle/${id}/Vaccine`}
                    >
                      Cancelar
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      sx={{ paddingTop: 0.8, paddingBottom: 0.8 }}
                    >
                      Adicionar
                    </Button>
                  </Grid>
                </div>
              </Box>
            </form>
          </div>
        </div>
      </Box>
    </>
  );
};

export default VaccineFormPagetst;
