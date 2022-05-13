import { Box, FormControl, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getControls } from "utils/FormUtils";
import { VacineHelper } from "../helpers/VacineHelpers";
import { VacineModel } from "../models/VacineModel";

const VaccineCardViewForm = (): ReactElement => {
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

  useEffect(() => {
    loadingHelper.startLoading();
    if (id && idVacine) {
      vacineHelper.getVacineById(idVacine, id).then((vacine?: VacineModel) => {
        if (vacine) {
          setInitialValues(vacine);
        } else {
          //TODO: Volta para listagem
          toast.error("VACA NAO ENCONTRADA");
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
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Grid item xs={2} sx={{ margin: "1%" }}>
                <TextField
                  style={{ width: 180 }}
                  id="outlined-disabled"
                  label="Nome"
                  type="text"
                  disabled={true}
                  {...getControls(formik, "name")}
                />
              </Grid>
              <Grid sx={{ margin: "1%" }}>
                <TextField
                  style={{ width: 150 }}
                  id="outlined-disabled"
                  label="Lote"
                  disabled={true}
                  {...getControls(formik, "lote")}
                  type="number"
                />
              </Grid>
              <Grid sx={{ margin: "1%" }}>
                <TextField
                  style={{ width: 180 }}
                  id="outlined-disabled"
                  label="Fabricante"
                  disabled={true}
                  {...getControls(formik, "manufacturer")}
                  type="text"
                />
              </Grid>
              <Grid sx={{ margin: "1%" }}>
                <TextField
                  style={{ width: 180 }}
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
              <Grid sx={{ margin: "1%" }}>
                <TextField
                  style={{ width: 180 }}
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

export default VaccineCardViewForm;
