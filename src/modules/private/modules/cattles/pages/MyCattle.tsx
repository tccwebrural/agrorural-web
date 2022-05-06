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
  Menu,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdCoronavirus } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import vaca1 from "../../../../../assets/vaca1.png";
import { CattleModel } from "../models/CattleModel";
import { Formik } from "formik";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { CattleHelper } from "../helpers/CattleHelper";
import toast from "react-hot-toast";
import { getFireError } from "utils/HandleFirebaseError";
import { getControls } from "utils/FormUtils";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Modal from "@mui/material/Modal";

import "../../../styles/MyCattle.css";

const MyCattle = (): ReactElement => {
  const [openDeleteVaccine, setOpenDeleteVaccine] = useState(false);
  const handleOpenDeleteVaccine = () => setOpenDeleteVaccine(true);
  const handleCloseDeleteVaccine = () => setOpenDeleteVaccine(false);
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Container
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
      >
        <div className="imgGados">
          <img src={vaca1} alt="Erro..." />
        </div>
        <div id="blocoGeral-myCatlle">
          <section>
            <div id="blocoTitulo-criacao-myCatlle">
              <h2 id="blocoTituloTxt-criacao-myCatlle">
                Minha Criação&gt;Animal : {initialValues.name}{" "}
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
              <div id="blocoTitulo-vacina-myCatlle">
                <h2 id="blocoTituloTxt-vacina-myCatlle">Cartao de Vacina</h2>
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

              <div id="blocoVacinas-myCatlle">
                <Grid id="vacinas-myCatlle">
                  <Button
                    style={{
                      width: 5,
                      marginLeft: "60%",
                      marginTop: "4%",
                      borderRadius: 50,
                    }}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon style={{ color: "var(--cor008)" }} />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  ></Menu>
                  <abbr title="Detalhes da vacina">
                    <MdCoronavirus
                      size={80}
                      style={{ margin: "-15 0 2 0", color: "black" }}
                    />
                    <p>Virus 1</p>
                  </abbr>
                </Grid>
                <Grid id="vacinas-myCatlle">
                  <Button
                    style={{
                      width: 5,
                      marginLeft: "60%",
                      marginTop: "4%",
                      borderRadius: 50,
                    }}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon style={{ color: "var(--cor008)" }} />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  ></Menu>
                  <Button
                    component={Link}
                    to="/private/cattle/vaccine/view"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <abbr title="Detalhes da vacina">
                      <MdCoronavirus
                        size={80}
                        style={{ margin: "-20 0 2 0", color: "black" }}
                      />

                      <p>Virus 2</p>
                    </abbr>
                  </Button>
                </Grid>
                <Grid id="vacinas-myCatlle">
                  <Button
                    style={{
                      width: 5,
                      marginLeft: "60%",
                      marginTop: "4%",
                      borderRadius: 50,
                    }}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon style={{ color: "var(--cor008)" }} />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  ></Menu>
                  <Button
                    component={Link}
                    to="/private/cattle/vaccine/view"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <abbr title="Detalhes da vacina">
                      <MdCoronavirus
                        size={80}
                        style={{ margin: "-20 0 2 0", color: "black" }}
                      />

                      <p>Virus 3</p>
                    </abbr>
                  </Button>
                </Grid>
                <Grid id="vacinas-myCatlle">
                  <Button
                    style={{
                      width: 5,
                      marginLeft: "60%",
                      marginTop: "4%",
                      borderRadius: 50,
                    }}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon style={{ color: "var(--cor008)" }} />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      // to="/private/cattles/CattleEditVaccine:id"
                      to={`/private/cattle/${id}/vacine/edit`}
                    >
                      Editar Vacina
                    </MenuItem>

                    <MenuItem onClick={handleOpenDeleteVaccine}>
                      Deletar Vacina
                    </MenuItem>
                    <Modal
                      open={openDeleteVaccine}
                      onClose={handleCloseDeleteVaccine}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 560,
                          height: 250,
                          bgcolor: "white",
                          borderRadius: "10px",
                          boxShadow: 11,
                          p: 4,
                        }}
                      >
                        <Grid
                          sx={{
                            margin: "2%  2%",
                            textAlign: "center",
                            color: "var(--cor005)",
                            fontSize: 20,
                          }}
                        >
                          <span>
                            Você realmente deseja excluir essa vacina?
                          </span>
                        </Grid>
                        <Grid
                          sx={{
                            margin: "2%  15% 2% 2%",
                            display: "flex",
                            textAlign: "center",
                            fontWeight: "lighter",
                          }}
                        >
                          <p>
                            Após a exclusão não será possível recuperar os dados
                            desta vacina.
                          </p>
                        </Grid>

                        <Grid
                          sx={{
                            display: "flex",
                            margin: " 1%",
                            justifyContent: "center",
                          }}
                        >
                          <Grid
                            sx={{
                              margin: " 6% 1%",
                              borderRadius: "10px",
                            }}
                          >
                            <Button id="btn-modalDelet">Sim</Button>{" "}
                          </Grid>
                          <Grid
                            sx={{
                              margin: " 6% 1%",
                              borderRadius: "10px",
                            }}
                          >
                            <Button
                              id="btn-modalCancel"
                              onClick={handleCloseDeleteVaccine}
                            >
                              Não
                            </Button>{" "}
                          </Grid>
                        </Grid>
                      </Box>
                    </Modal>
                  </Menu>
                  <Button
                    component={Link}
                    to="/private/cattle/vaccine/view"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    {" "}
                    <abbr title="Detalhes da vacina">
                      <MdCoronavirus
                        size={80}
                        style={{ margin: "-20 0 2 0", color: "black" }}
                      />

                      <p>Virus 4</p>
                    </abbr>
                  </Button>
                </Grid>
              </div>
            </div>
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
          </section>
        </div>
      </Container>
    </>
  );
};
export default MyCattle;
