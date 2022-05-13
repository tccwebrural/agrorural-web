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
import { Formik } from "formik";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import React, { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPrinter } from "react-icons/bs";
import { MdCoronavirus } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getControls } from "utils/FormUtils";
import "../../../styles/cattleViewVaccine.css";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { CattleModel } from "../../cattles/models/CattleModel";
import VaccineCardViewForm from "../Components/VacineCardViewForm";

function imprimir() {
  window.print();
}

const cattleViewVaccine = (): ReactElement => {
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
  console.log("id da pag" + id);

  useEffect(() => {
    loadingHelper.startLoading();
    if (id) {
      cattleHelper.getCattleById(id).then((cattle?: CattleModel) => {
        if (cattle) {
          setInitialValues(cattle);
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

  const submitForm = (cattle: CattleModel) => {};
  return (
    <>
      <Container
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
      >
        <div id="blocoGeral-viewCatlle">
          <section>
            <div id="blocoTitulo-criacao-viewCatlle">
              <h2 id="blocoTituloTxt-criacao-viewCatlle">
                Cartão do Gado : {initialValues.name}
              </h2>
              <span id="blocoTituloLine-criacao-viewCatlle">
                <abbr title="Imprimir">
                  <Fab id="icone-imprimir-viewCatlle" onClick={imprimir}>
                    <BsPrinter size={20} />
                  </Fab>
                </abbr>
              </span>
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
                    }}
                  >
                    <Grid item xs={2} sx={{ margin: "0.4%" }}>
                      <TextField
                        style={{ width: 180 }}
                        id="outlined-disabled"
                        label="Nome"
                        type="text"
                        disabled={true}
                        {...getControls(formik, "name")}
                      />
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <TextField
                        style={{ width: 180 }}
                        id="outlined-disabled"
                        label="Peso"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "weigth")}
                      />
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <FormControl sx={{ minWidth: 221 }}>
                        <InputLabel>Tipo</InputLabel>
                        <Select
                          disabled={true}
                          {...getControls(formik, "type")}
                          label="Grouping"
                          name="tipo"
                        >
                          <MenuItem value={1}>Gado de Cortes</MenuItem>
                          <MenuItem value={2}>Gado Leitero</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <TextField
                        style={{ width: 180 }}
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
                        style={{ width: 120 }}
                        id="Qtd de Cria"
                        label="Qtd de Cria"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "qtyChildren")}
                      />
                    </Grid>
                    <Grid sx={{ margin: "0.4%" }}>
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel htmlFor="type">Sexo</InputLabel>
                        <Select
                          disabled={true}
                          {...getControls(formik, "sex")}
                          label="Grouping"
                          name="type"
                        >
                          <MenuItem value={1}>Macho</MenuItem>
                          <MenuItem value={2}>Femea</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </FormControl>
                </Box>
              )}
            </Formik>
          </section>

          <section>
            <div>
              <div id="blocoTitulo-vacina-viewCatlle">
                <h2 id="blocoTituloTxt-vacina-viewCatlle">Cartao de Vacina</h2>
                <span id="blocoTituloLine-vacina-viewCatlle"></span>
              </div>
              {/* <div id="infoGado-viewCatlle">
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
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
                      <TextField
                        style={{ width: 150 }}
                        id="outlined-disabled"
                        label="Lote"
                        type="number"
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
                      <TextField
                        style={{ width: 180 }}
                        id="outlined-disabled"
                        label="Fabricante"
                        type="text"
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
                      <TextField
                        style={{ width: 180 }}
                        id="outlined-disabled"
                        label="Data da Aplicação"
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
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </FormControl>
                </Box>
              </div> */}
              {VaccineCardViewForm()}

              {/* <div id="blocoVacinas-viewCatlle">
                <Grid id="vacinas">
                  <MdCoronavirus style={{ marginTop: 25 }} size={80} />
                  <p>Virus 1</p>
                </Grid>
              </div> */}
            </div>
            <div id="button-viewCatlle">
              <Button
                variant="contained"
                color="inherit"
                component={Link}
                to="/private/cattles"
              >
                Voltar
              </Button>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
};
export default cattleViewVaccine;
