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
import AddIcon from "@mui/icons-material/Add";
import vaca1 from "../../../../../assets/vaca1.png";
import "../../../styles/MyCattle.css";
import { CattleModel } from "../models/CattleModel";
import { idText } from "typescript";
import { Formik } from "formik";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { CattleHelper } from "../helpers/CattleHelper";
import toast from "react-hot-toast";
import { getFireError } from "utils/HandleFirebaseError";
import { getControls } from "utils/FormUtils";

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
          toast.error("VACA NAO ENCONTRADA");
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
        <div className="imgGados">
          <img src={vaca1} alt="Erro..." />
        </div>
        <div id="blocoGeral">
          <section>
            <div id="blocoTitulo-criacao">
              <h2 id="blocoTituloTxt-criacao">Minha Criação&gt;Animal k </h2>
              <span id="blocoTituloLine-criacao"></span>
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
                        style={{ width: 180 }}
                        id="outlined-disabled"
                        label="Peso"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "weigth")}
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
                      <FormControl sx={{ minWidth: 221 }}>
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
                    <Grid sx={{ margin: "1%" }}>
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
                    <Grid sx={{ margin: "1%" }}>
                      <TextField
                        style={{ width: 180 }}
                        id="Qtd de Cria"
                        label="Qtd de Cria"
                        type="number"
                        disabled={true}
                        {...getControls(formik, "qtyChildren")}
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
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
              <div id="blocoTitulo-vacina">
                <h2 id="blocoTituloTxt-vacina">Cartao de Vacina</h2>
                <span id="blocoTituloLine-vacina">
                  <Fab
                    id="icon-vaccine"
                    component={Link}
                    to={`/private/cattles/${id}/vacine/form`}
                  >
                    <button id="btAdd-Vaccine">
                      <abbr title="Adicionar Vacina">
                        <AddIcon />
                      </abbr>
                    </button>
                  </Fab>
                </span>
              </div>

              <div id="blocoVacinas">
                <Grid id="vacinas">
                  <Button
                    component={Link}
                    to="/private/cattle/:id/Vaccine/view"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <abbr title="Detalhes da vacina">
                      <MdCoronavirus
                        size={80}
                        style={{ margin: "10 0", color: "black" }}
                      />

                      <p>Virus 1</p>
                    </abbr>
                  </Button>
                </Grid>
                <Grid id="vacinas">
                  <Button
                    component={Link}
                    to="/private/cattle/vaccine/view"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <abbr title="Detalhes da vacina">
                      <MdCoronavirus
                        size={80}
                        style={{ margin: "10 0", color: "black" }}
                      />
                      <p>Virus 2</p>
                    </abbr>
                  </Button>
                </Grid>
                <Grid id="vacinas">
                  <Button
                    component={Link}
                    to="/private/cattle/vaccine/view"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <abbr title="Detalhes da vacina">
                      <MdCoronavirus
                        size={80}
                        style={{ margin: "10 0", color: "black" }}
                      />

                      <p>Virus 3</p>
                    </abbr>
                  </Button>
                </Grid>
                <Grid id="vacinas">
                  <Button
                    component={Link}
                    to="/private/cattle/vaccine/view"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    <abbr title="Detalhes da vacina">
                      <MdCoronavirus
                        size={80}
                        style={{ margin: "10 0", color: "black" }}
                      />

                      <p>Virus 4</p>
                    </abbr>
                  </Button>
                </Grid>
              </div>
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
export default MyCattle;
