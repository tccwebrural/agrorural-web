import {
  Box,
  Button,
  Checkbox,
  Container,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { MdCoronavirus } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/CattleEditVacine.css";
const label = { inputProps: { "aria-label": "" } };
import vaca1 from "../../../../../assets/vaca1.png";
import { VacineHelper } from "../helpers/VacineHelpers";
import { VacineModel } from "../models/VacineModel";
import toast from "react-hot-toast";
import { getFireError } from "utils/HandleFirebaseError";
import { Formik } from "formik";
import { VacineValidatorSchema } from "../validators/VacineValidatorSchema";
import { getControls } from "utils/FormUtils";
import bezerro from "../../../../../assets/bezerro.png";
import { FEBRE_AFTOSA } from "../../../../../constants";
import { BRUCELOSE } from "../../../../../constants";
import { RAIVA } from "../../../../../constants";

const CattleEditVaccine = (): ReactElement => {
  function UpdateVaccineData() {
    alert("Dados atualizados");
  }

  const vacineHelpers = VacineHelper();

  const [initialValues, setInitialValues] = useState<VacineModel>({
    date_application: "",
    expiration_date: "",
    lote: 0,
    manufacturer: "",
    name: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { idVacine } = useParams();

  console.log("ID VACINA " + "= " + idVacine);

  console.log(vacineHelpers.getAllVacines("1DpbNDXAu4ebmAZKgOb7"));
  console.log(id);

  useEffect(() => {
    if (id && idVacine) {
      vacineHelpers.getVacineById(idVacine, id).then((vacine?: VacineModel) => {
        if (vacine) {
          setInitialValues(vacine);
        } else {
          //TODO: Volta para listagem
          toast.error("vacina NAO ENCONTRADA");
        }
      });
    } else {
      //TODO: Volta para listagem
    }
  }, []);

  const getActualVacine = (vacine: VacineModel) => {
    navigate(`/private/cattle/${id}/vacine/${vacine.id}/edit`);
  };
  const submitForm = (vacine: VacineModel) => {
    if (id && idVacine) {
      vacineHelpers.updateVacineId(vacine, id, idVacine).then(() =>
        //toast sucess
        navigate(`/private/cattle/${id}/Vaccine`)
      );
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
            <div id="MainBlock-VaccineForm">
              <div className="Block-Txt-Line">
                <h2 className="Block-Line">
                  <span id="Block-Txt-CattleEditVaccine">
                    Editar Vacina &gt; {initialValues.name}
                  </span>
                </h2>
              </div>
              <div id="Block-AnimalData">
                <form
                  onSubmit={formik.handleSubmit}
                  style={{ width: 1030, marginLeft: -8 }}
                >
                  <Box
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                  >
                    {/* <TextField
                      style={{ width: 238, margin: "0.4%" }}
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
                        {...getControls(formik, "name")}
                        label="Grouping"
                        style={{ width: 230, margin: "0.4%" ,marginTop:4}}

                        // name="category"
                      >
                        <MenuItem value={FEBRE_AFTOSA}>Febre aftosa</MenuItem>
                        <MenuItem value={BRUCELOSE}>Brucelose</MenuItem>
                        <MenuItem value={RAIVA}>Raiva</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      style={{ width: 150, margin: "0.4%" }}
                      label="Lote"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "lote")}
                    />
                    <TextField
                      style={{ width: 220, margin: "0.4%" }}
                      label="Fabricante"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "manufacturer")}
                    />
                    <TextField
                      style={{ width: 190, margin: "0.4%" }}
                      label="Data de Aplicação"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "date_application")}
                    />
                    <TextField
                      style={{ width: 190, margin: "0.4%" }}
                      label="Validade da Vacina"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "expiration_date")}
                    />
                    <div id="Block-CalfImage-EditVaccine">
                      <img style={{ width: 120 }} src={bezerro} alt="Erro..." />
                    </div>
                    <div id="Block-CowImage-EditVaccine">
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
                          sx={{ paddingTop: 0.7, paddingBottom: 0.8 }}
                        >
                          Atualizar
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
export default CattleEditVaccine;
