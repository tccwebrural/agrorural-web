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
import VaccineCattleCardComponent from "../Components/VacineCattleCardComponent";
import VaccineCardViewForm from "../Components/VacineCattleCardComponent";

function imprimir() {
  window.print();
}

const CattleViewVaccine = (): ReactElement => {
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
          toast.error(
            "Vaca não Endereço não encontrado, por favor tente novamente!"
          );
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
        <div id="blocoGeral-viewCatlle">
          <section>
            <div id="blocoTitulo-criacao-viewCatlle">
              <h2 id="blocoTituloTxt-criacao-viewCatlle">
                Dados do animals &gt; {initialValues.name}
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
                  <FormControl id="formularioDadosAnimal">
                    <Grid item xs={2} sx={{ margin: "0.4%" }}>
                      <TextField
                        style={{ width: 190 }}
                        label="Nome"
                        type="text"
                        disabled={true}
                        {...getControls(formik, "name")}
                      />
                    </Grid>
                    <Grid className="gridInputVaccine">
                      <TextField
                        id="inputPesoVaccine"
                        label="Peso"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "weigth")}
                      />
                    </Grid>
                    <Grid className="gridInputVaccine">
                      <FormControl id="inputTipoVaccine">
                        <InputLabel>Tipo</InputLabel>
                        <Select
                          disabled={true}
                          {...getControls(formik, "type")}
                          label="Tipo"
                        >
                          <MenuItem value={1}>Gado de Cortes</MenuItem>
                          <MenuItem value={2}>Gado Leitero</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid className="gridInputVaccine">
                      <TextField
                        id="inputDataNascimentoVaccine"
                        label="Data de Nascimento"
                        type="date"
                        disabled={true}
                        {...getControls(formik, "birthday")}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid className="gridInputVaccine">
                      <TextField
                        id="inputQtdCriaVaccine"
                        label="Qtd de Cria"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "qtyChildren")}
                      />
                    </Grid>
                    <Grid className="gridInputVaccine">
                      <FormControl id="inputSexoVaccine">
                        <InputLabel htmlFor="type">Sexo</InputLabel>
                        <Select
                          disabled={true}
                          {...getControls(formik, "sex")}
                          label="Sexo"
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
                <h2 id="blocoTituloTxt-vacina-viewCatlle">Dados da Vacina </h2>
                <span id="blocoTituloLine-vacina-viewCatlle"></span>
              </div>

              {VaccineCattleCardComponent()}
            </div>
            <div id="button-viewCatlle">
              <Button
                variant="contained"
                color="inherit"
                component={Link}
                to={`/private/cattle/${id}/Vaccine`}
                style={{ marginTop: "13%" }}
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
export default CattleViewVaccine;
