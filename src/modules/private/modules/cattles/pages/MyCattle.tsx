import {
  Container,
  Fab,
  Box,
  FormControl,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { CattleModel } from "../models/CattleModel";
import { Formik } from "formik";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { CattleHelper } from "../helpers/CattleHelper";
import toast from "react-hot-toast";
import { getControls } from "utils/FormUtils";
import VaccineCardView from "../../vacine/Components/VaccineCardView";

import "../../../styles/MyCattle.css";

const MyCattle = (): ReactElement => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<CattleModel>({
    identifier: 0,
    weigth: 0,
    name: "",
    type: 1,
    birthday: "",
    sex: 1,
    qtyChildren: 0,
  });

  const cattleHelper = CattleHelper();
  const loadingHelper = useGlobalLoading();
  const navigate = useNavigate();

  useEffect(() => {
    loadingHelper.startLoading();

    if (id) {
      cattleHelper.getCattleById(id).then((cattle?: CattleModel) => {
        if (cattle) {
          setInitialValues(cattle);
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

  const submitForm = (cattle: CattleModel) => {};

  return (
    <>
      <Container
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
      >
        <div id="blocoGeral-myCatlle">
          <section>
            <div id="blocoTitulo-criacao-myCatlle">
              <h2 id="blocoTituloTxt-criacao-myCatlle">
                Dados do animal &gt; {initialValues.name}{" "}
              </h2>
              <span id="blocoTituloLine-criacao-myCatlle"></span>
            </div>

            <Formik
              enableReinitialize={true}
              onSubmit={submitForm}
              initialValues={initialValues}
            >
              {(formik) => (
                <Box>
                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      width: 180,
                      margin: "auto",
                    }}
                  >
                    <Grid item xs={2} sx={{ margin: "0.4%", marginLeft: -3 }}>
                      <TextField
                        style={{ width: 178, marginRight: 8 }}
                        id="outlined-disabled"
                        label="Nome"
                        type="text"
                        disabled={true}
                        {...getControls(formik, "name")}
                      />
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <TextField
                        style={{ width: 150, marginRight: 8 }}
                        id="outlined-disabled"
                        label="Peso"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "weigth")}
                      />
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <FormControl sx={{ minWidth: 221, marginRight: 1 }}>
                        <TextField
                          select
                          disabled={true}
                          {...getControls(formik, "type")}
                          label="Tipo"
                        >
                          <MenuItem value={1}>Gado de Cortes</MenuItem>
                          <MenuItem value={2}>Gado Leitero</MenuItem>
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <TextField
                        style={{ width: 180, marginRight: 8 }}
                        id="outlined-disabled"
                        label="Data de Nascimento"
                        type="date"
                        disabled={true}
                        {...getControls(formik, "birthday")}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <TextField
                        style={{ width: 120, marginRight: 8 }}
                        id="Qtd de Cria"
                        label="Qtd de Cria"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "qtyChildren")}
                      />
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <FormControl sx={{ minWidth: 120 }}>
                        <TextField
                          select
                          disabled={true}
                          {...getControls(formik, "sex")}
                          label="Sexo"
                          name="type"
                        >
                          <MenuItem value={1}>Macho</MenuItem>
                          <MenuItem value={2}>Femea</MenuItem>
                        </TextField>
                      </FormControl>
                    </Grid>
                  </FormControl>
                </Box>
              )}
            </Formik>
          </section>

          <div id="blocoTitulo-vacina-myCatlle">
            <h2 id="blocoTituloTxt-vacina-myCatlle">
              Cartão de Vacina &gt; {initialValues.name}
            </h2>
            <span id="blocoTituloLine-vacina-myCatlle">
              <Fab
                id="icon-vaccine-myCatlle"
                component={Link}
                to={`/private/cattles/${id}/vacine/form`}
              >
                <button id="btAdd-Vaccine-myCatlle">
                  <abbr title="Adicionar Vacina">
                    <AddIcon />
                  </abbr>
                </button>
              </Fab>
            </span>
          </div>

          <div id="blocoVacinas-myCatlle">{VaccineCardView()}</div>

          <div id="button-myCatlle">
            <Button
              variant="contained"
              color="inherit"
              component={Link}
              to="/private/cattles"
            >
              Voltar
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
export default MyCattle;
