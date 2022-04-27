import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { CattleValidatorSchema } from "modules/public/modules/authentication/validators/CattleValidatorSchema";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import bezerro from "../../../../../assets/bezerro.png";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import { getControls } from "../../../../../utils/FormUtils";
import "../../../styles/UpdateCattle.css";
import { CattleHelper } from "../helpers/CattleHelper";
import { CattleModel } from "../models/CattleModel";

const UpdateCattle = (): ReactElement => {
  const cattleHelper = CattleHelper();
  const loadingHelper = useGlobalLoading();

  const [initialValues, setInitialValues] = useState<CattleModel>({
    identifier: 0,
    weigth: 0,
    name: "",
    type: 1,
    birthday: "",
    sex: 1,
    qtyChildren: 0,
  });

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
        }
        loadingHelper.stopLoading();
      });
    } else {
      //TODO: Volta para listagem
      loadingHelper.stopLoading();
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "block",
          justifyContent: "center",
        }}
      >
        <Formik
          // Enable -> renderiza o estado do initial values
          enableReinitialize={true}
          onSubmit={async (formValue: CattleModel) => {
            formValue.id = id;
            cattleHelper
              .updateCattleId(formValue)
              .then(() =>
                //toast sucess

                navigate("/private/cattles")
              )
              .catch((err) => {
                //TODO: Mensagem de erro
                //toast error
              });
          }}
          validationSchema={CattleValidatorSchema}
          initialValues={initialValues}
        >
          {(bolinha) => (
            <div className="MainBlock">
              <div className="Block-Txt-Line">
                <h2 className="Block-Line">
                  <span className="Block-Txt">
                    Minha Criação &gt; Atualizar Gado
                  </span>
                </h2>
              </div>

              <form id="Block-EditAnimalData" onSubmit={bolinha.handleSubmit}>
                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 260 }}>
                    <InputLabel htmlFor="grouped-select">Sexo</InputLabel>

                    <Select
                      {...getControls(bolinha, "sex")}
                      label="Grouping"
                      // name="category"
                    >
                      <MenuItem value={1}>MACHO</MenuItem>
                      <MenuItem value={2}>FÊMEA</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    style={{ width: 270 }}
                    label="Identificador"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...getControls(bolinha, "identifier")}
                  />
                  <TextField
                    style={{ width: 300 }}
                    label="Nome"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...getControls(bolinha, "name")}
                  />
                  <TextField
                    style={{ width: 280 }}
                    label="Data de Nascimento"
                    type="date"
                    {...getControls(bolinha, "birthday")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <FormControl sx={{ m: 1, minWidth: 271 }}>
                    <InputLabel htmlFor="type">Tipo</InputLabel>
                    <Select
                      {...getControls(bolinha, "type")}
                      //   label="Grouping"
                      // name="type"
                    >
                      <MenuItem value={1}>Gado de Corte</MenuItem>
                      <MenuItem value={2}>Gado Leitero</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    style={{ width: 279 }}
                    label="Peso"
                    {...getControls(bolinha, "weigth")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="number"
                  />
                  <TextField
                    // disabled
                    label="Quantidade de cria"
                    type="number"
                    // name="identifier"
                    {...getControls(bolinha, "qtyChildren")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: 268 }}
                  />

                  <div id="Block-CowImage-EditAnimalData">
                    <img
                      id="CowImage-EditAnimalData"
                      src={vaca_com_chifre_andando}
                      alt="bezerro"
                    />
                  </div>
                  <div id="Block-CalfImage-EditAnimalData">
                    <img
                      id="CalfImage-EditAnimalData"
                      src={bezerro}
                      alt="bezerro"
                    />
                  </div>
                  <div id="Btns-Update-Cancel-EditAnimalData">
                    <Grid item sx={{ margin: 1 }}>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        color="error"
                        component={Link}
                        to="/private/cattles"
                      >
                        Cancelar
                      </Button>

                      <Button
                        variant="contained"
                        color="success"
                        // onClick={salvarDadosAnimal}
                        type="submit"
                        sx={{ paddingTop: 2.3, paddingBottom: 2.3 }}
                      >
                        Atualizar
                      </Button>
                    </Grid>
                  </div>
                </Box>
              </form>
            </div>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default UpdateCattle;
