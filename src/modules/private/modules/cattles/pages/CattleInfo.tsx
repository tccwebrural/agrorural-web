import {
  Container,
  Fab,
  Box,
  FormControl,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdCoronavirus } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";
import vaca1 from "../../../../../assets/vaca1.png";
import { CattleModel } from "../models/CattleModel";
import { CattleHelper } from "../helpers/CattleHelper";
import toast from "react-hot-toast";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { Formik } from "formik";
import { getFireError } from "utils/HandleFirebaseError";
import { getControls } from "utils/FormUtils";
import VaccineCardView from "../../vacine/Components/VaccineCardView";
import VaccineModalDelete from "../../vacine/Components/VaccineInfoVIew";

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
      <Container
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
      >
        <div id="blocoGeral-infoGado">
          <section>
            <div id="blocoTitulo-criacao-infoGado">
              <h2 id="blocoTituloTxt-criacao-infoGado">
                Informações do animal &gt; {initialValues.name}
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
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: 1005,
                        marginLeft: 5,
                      }}
                    >
                      <Grid item xs={2} sx={{ margin: "0.4%" }}>
                        <TextField
                          style={{ width: 200 }}
                          id="outlined-disabled"
                          label="Nome"
                          type="text"
                          disabled={true}
                          {...getControls(formik, "name")}
                        />
                      </Grid>
                      <Grid sx={{ margin: "0.4%" }}>
                        <TextField
                          style={{ width: 190 }}
                          id="outlined-disabled"
                          label="Peso"
                          type="number"
                          disabled={true}
                          {...getControls(formik, "weigth")}
                        />
                      </Grid>
                      <Grid sx={{ margin: "0.4%" }}>
                        <FormControl sx={{ minWidth: 180 }}>
                          <InputLabel>Tipo</InputLabel>
                          <Select
                            disabled={true}
                            {...getControls(formik, "type")}
                            label="Grouping"
                            name="tipo"
                          >
                            <MenuItem value={1}>Gado de Corte</MenuItem>
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
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel htmlFor="type">Sexos</InputLabel>
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
      </Container>
    </>
  );
};

export default CattleInfoGado;
