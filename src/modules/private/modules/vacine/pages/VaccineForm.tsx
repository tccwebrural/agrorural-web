import React, { ReactElement, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
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
import vaca1 from "../../../../../assets/vaca1.png";
import {
  COLLECTION_VACINES,
  FEBRE_AFTOSA,
  RAIVA,
  BRUCELOSE,
} from "../../../../../constants";
import bezerro from "../../../../../assets/bezerro.png";
const VaccineFormPage = (): ReactElement => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<VacineModel>({
    date_application: "",
    expiration_date: "",
    lote: 0,
    manufacturer: "",
    name: BRUCELOSE,
  });

  const navigate = useNavigate();

  const vacineHelper = VacineHelper();

  console.log(id);

  const submitForm = async (vacine: VacineModel) => {
    if (id) {
      vacineHelper
        .createVacine(id, vacine)
        .then(() =>
          //toast sucess
          {
            navigate("/private/cattles");
            // navigate(`private/cattle/${id}/Vaccine`);
          }
        )
        .catch((err) => {
          //TODO: Mensagem de erro
          //toast erro
          console.error(err);
          toast.error(getFireError(err));
        });
      // vacine.id = id;
    }
    console.log("id da vacina :" + vacine.id + vacine.name);
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
            <div id="MainBlock-VaccineForm">
              <div className="Block-Txt-Line">
                <h2 className="Block-Line">
                  <span id="Block-Txt-VaccineRegister">Cadastrar Vacina</span>
                </h2>
              </div>
              <div id="Block-AnimalData">
                <form
                  style={{ width: 1200, marginLeft: 0 }}
                  onSubmit={formik.handleSubmit}
                >
                  <Box
                    sx={{
                      "& .MuiTextField-root": {
                        m: 1,
                        width: "26ch",
                        margin: "0.4%",
                      },
                    }}
                  >
                    {/* <TextField
                      style={{ width: 230 }}
                      label="Nome"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "name")}
                    /> */}
                    <FormControl>
                      <InputLabel>Tipo</InputLabel>
                      <Select
                        style={{
                          width: 228,
                          marginTop: 5,
                          marginRight: 4,
                          marginLeft: 4,
                        }}
                        {...getControls(formik, "name")}
                        label="Grouping"
                        // name="category"
                      >
                        <MenuItem value={BRUCELOSE}>Brucelose</MenuItem>
                        <MenuItem value={FEBRE_AFTOSA}>Febre aftosa</MenuItem>
                        <MenuItem value={RAIVA}>Raiva</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      style={{ width: 160 }}
                      label="Lote"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "lote")}
                    />
                    <TextField
                      style={{ width: 218 }}
                      label="Fabricante"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "manufacturer")}
                    />
                    <TextField
                      style={{ width: 185 }}
                      label="Data de Aplicação"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "date_application")}
                    />
                    <TextField
                      style={{ width: 185 }}
                      label="Validade da Vacina"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "expiration_date")}
                    />

                    <div id="Block-CowImage-CadastroVacina">
                      <img style={{ width: 300 }} src={vaca1} alt="Erro..." />
                    </div>
                    <div id="Block-CalfImage-CadastroVacina">
                      <img style={{ width: 120 }} src={bezerro} alt="Erro..." />
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
                          sx={{ paddingTop: 0.7, paddingBottom: 0.8 }}
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
