import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FEBRE_AFTOSA, RAIVA, BRUCELOSE } from "../../../../../constants";

import { Formik } from "formik";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getControls } from "utils/FormUtils";
import { VacineHelper } from "../helpers/VacineHelpers";
import { VacineModel } from "../models/VacineModel";
import CattleViewVaccine from "../pages/cattleViewVaccine";

const VaccineCattleCardComponent = (): ReactElement => {
  const { id, idVacine } = useParams();

  const [initalValues, setInitialValues] = useState<VacineModel>({
    date_application: "",
    name: "",
    expiration_date: "",
    lote: 0,
    manufacturer: "",
  });

  const vacineHelper = VacineHelper();
  const loadingHelper = useGlobalLoading();
  const navigate = useNavigate();
  useEffect(() => {
    loadingHelper.startLoading();
    if (id && idVacine) {
      vacineHelper.getVacineById(idVacine, id).then((vacine?: VacineModel) => {
        if (vacine) {
          setInitialValues(vacine);
        } else {
          //TODO: Volta para listagem
          toast.error("Endereço não encontrado, por favor tente novamente!");
          navigate("/private/cattles");
        }
        loadingHelper.stopLoading();
      });
    } else {
      //TODO: Volta para listagem
      loadingHelper.stopLoading();
    }
  }, []);

  const submitForm = (cattle: VacineModel) => {};

  return (
    <>
      <Formik
        enableReinitialize={true}
        onSubmit={submitForm}
        initialValues={initalValues}
      >
        {(formik) => (
          <Box>
            <FormControl id="formularioDadosVacina">
              <Grid item xs={2} sx={{ margin: "0.4%", marginLeft: 2 }}>
                <FormControl>
                  {/* <InputLabel>Tipo</InputLabel> */}
                  <TextField
                    {...getControls(formik, "name")}
                    label="Tipo"
                    // name="category"
                    style={{ width: 210 }}
                    disabled={true}
                  >
                    {/* <MenuItem value={BRUCELOSE}>Brucelose</MenuItem>
                    <MenuItem value={FEBRE_AFTOSA}>Febre aftosa</MenuItem>
                    <MenuItem value={RAIVA}>Raivas</MenuItem> */}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid sx={{ margin: "0.4%" }}>
                <TextField
                  style={{ width: 170 }}
                  id="outlined-disabled"
                  label="Lote"
                  disabled={true}
                  {...getControls(formik, "lote")}
                  type="number"
                />
              </Grid>
              <Grid sx={{ margin: "0.4%" }}>
                <TextField
                  style={{ width: 210 }}
                  id="outlined-disabled"
                  label="Fabricante"
                  disabled={true}
                  {...getControls(formik, "manufacturer")}
                  type="text"
                />
              </Grid>
              <Grid sx={{ margin: "0.4%" }}>
                <TextField
                  style={{ width: 200 }}
                  id="outlined-disabled"
                  label="Data da Aplicação"
                  disabled={true}
                  {...getControls(formik, "date_application")}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid sx={{ margin: "0.4%" }}>
                <TextField
                  style={{ width: 200 }}
                  id="outlined-disabled"
                  label="Data da Validade"
                  disabled={true}
                  {...getControls(formik, "expiration_date")}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </FormControl>
          </Box>
        )}
      </Formik>
      <div id="infoGado-viewCatlle"></div>
    </>
  );
};

export default VaccineCattleCardComponent;
