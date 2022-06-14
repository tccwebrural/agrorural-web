import {
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
import { BsPrinter } from "react-icons/bs";
import { CattleModel } from "../models/CattleModel";
import { CattleHelper } from "../helpers/CattleHelper";
import toast from "react-hot-toast";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { Formik } from "formik";
import { getFireError } from "utils/HandleFirebaseError";
import { getControls } from "utils/FormUtils";

import "../../../styles/InfoGado.css";
import VaccineInfoView from "../../vacine/Components/VaccineInfoVIew";

function imprimir() {
  window.print();
}

const CattleInfoGado = (): ReactElement => {
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

  const { id } = useParams();
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

  const submitForm = (cattle: CattleModel) => {
    cattle.id = id;
    cattleHelper
      .updateCattleId(cattle)
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
  };
  return (
    <>
      <div id="blocoGeral-infoGado">
        <section>
          <div id="blocoTitulo-criacao-infoGado">
            <h2 id="blocoTituloTxt-criacao-infoGado">
              Dados do animal &gt; {initialValues.name}
            </h2>
            <span id="blocoTituloLine-criacao-infoGado">
              <abbr title="Imprimir">
                <Fab id="icone-imprimir" onClick={imprimir}>
                  <BsPrinter size={20} />
                </Fab>
              </abbr>
            </span>
          </div>

          <div id="infoGado">
            <Formik
              enableReinitialize={true}
              onSubmit={submitForm}
              initialValues={initialValues}
            >
              {(formik) => (
                <Box>
                  <FormControl id="formularioAnimalView">
                    <Grid className="gridInput">
                      <TextField
                        style={{ width: 213 }}
                        id="outlined-disabled"
                        label="Nome"
                        type="text"
                        disabled={true}
                        {...getControls(formik, "name")}
                      />
                    </Grid>
                    <Grid className="gridInput">
                      <TextField
                        id="inputPeso"
                        label="Peso"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "weigth")}
                      />
                    </Grid>
                    <Grid className="gridInput">
                      <FormControl sx={{ minWidth: 180 }}>
                        <TextField
                          select
                          disabled={true}
                          {...getControls(formik, "type")}
                          label="Grouping"
                          name="tipo"
                        >
                          <MenuItem value={1}>Gado de Corte</MenuItem>
                          <MenuItem value={2}>Gado Leitero</MenuItem>
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid className="gridInput">
                      <TextField
                        id="inputDataNascimento"
                        label="Data de Nascimento"
                        type="date"
                        disabled={true}
                        {...getControls(formik, "birthday")}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid className="gridInput">
                      <TextField
                        id="inputQtdCria"
                        label="Qtd de Cria"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "qtyChildren")}
                      />
                    </Grid>
                    <Grid className="gridInput">
                      <FormControl id="inputTipo">
                        <TextField
                          select
                          disabled={true}
                          {...getControls(formik, "sex")}
                          label="Grouping"
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
          </div>
        </section>

        <section>
          <div>
            <div id="blocoTitulo-vacina-infoGado">
              <h2 id="blocoTituloTxt-vacina-infoGado">
                Vacinas do animal &gt; {initialValues.name}
              </h2>
              <span id="blocoTituloLine-vacina-infoGado"></span>
            </div>

            <div id="blocoVacinas">{VaccineInfoView()}</div>
          </div>

          <div id="button">
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
    </>
  );
};

export default CattleInfoGado;
