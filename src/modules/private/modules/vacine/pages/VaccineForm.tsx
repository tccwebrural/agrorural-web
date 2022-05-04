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
import bezerro from "../../../../../assets/bezerro.png";
const label = { inputProps: { "aria-label": "" } };
import { MdCoronavirus } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/VacineForm.css";
import { VacineModel } from "../models/VacineModel";
import toast from "react-hot-toast";
import { VacineHelper } from "../helpers/VacineHelpers";
import { getFireError } from "utils/HandleFirebaseError";
import { Formik } from "formik";
import { VacineValidatorSchema } from "../validators/VacineValidatorSchema";
import { getControls } from "utils/FormUtils";
import { CattleModel } from "../../cattles/models/CattleModel";
const VaccineFormPage = (): ReactElement => {
  const [initialValues, setInitialValues] = useState<VacineModel>({
    date_application: "",
    expiration_date: "",
    lote: "",
    manufacturer: "",
    name: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const vacineHelper = VacineHelper();

  console.log(id);

  const submitForm = (vacine: VacineModel) => {
    vacine.id = id;
    if (id) {
      vacineHelper
        .createVacine(id, vacine)
        .then(() =>
          //toast sucess
          navigate("/private/cattles")
        )
        .catch((err) => {
          //TODO: Mensagem de erro
          //toast erro
          console.error(err);
          toast.error(getFireError(err));
        });
    }
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Formik
          enableReinitialize={true}
          onSubmit={submitForm}
          validationSchema={VacineValidatorSchema}
          initialValues={initialValues}
        >
          {(formik) => (
            <div className="MainBlock">
              <div className="Block-Txt-Line">
                <h2 className="Block-Line">
                  <span className="Block-Txt">Cadastrar Vacina</span>
                </h2>
              </div>
              <div id="Block-AnimalData">
                <form id="Block-EditAnimalData" onSubmit={formik.handleSubmit}>
                  <Box
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                  >
                    <TextField
                      style={{ width: 175 }}
                      label="Nome"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "name")}
                    />
                    <TextField
                      style={{ width: 100 }}
                      label="Lote"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "lote")}
                    />
                    <TextField
                      style={{ width: 160 }}
                      label="Fabricante"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "manufacturer")}
                    />
                    <TextField
                      style={{ width: 180 }}
                      label="Data de Aplicação"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "date_application")}
                    />
                    <TextField
                      style={{ width: 180 }}
                      label="Validade da Vacina"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "expiration_date")}
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
                        <p id="VacinaIcon-Txt">Vacina</p>
                        <Checkbox
                          {...label}
                          defaultChecked
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
                        <p id="VacinaIcon-Txt">Vírus</p>
                        <Checkbox
                          {...label}
                          sx={{ fontSize: 28, marginLeft: 6.5, marginTop: -1 }}
                        />
                      </fieldset>
                    </div>

                    <div id="Block-CalfImage-CadastroVacina">
                      <img
                        id="CalfImgae-CadastroVacina"
                        src={bezerro}
                        alt="bezerro"
                      />
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
                          sx={{ paddingTop: 2.2, paddingBottom: 2.2 }}
                        >
                          Adicionar
                        </Button>
                      </Grid>
                    </div>
                  </Box>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default VaccineFormPage;
