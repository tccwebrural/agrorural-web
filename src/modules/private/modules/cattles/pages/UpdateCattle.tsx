import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { CattleValidatorSchema } from "modules/private/modules/cattles/validators/CattleValidatorSchema";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import React, { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFireError } from "utils/HandleFirebaseError";
import bezerro from "../../../../../assets/bezerro.png";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import { getControls } from "../../../../../utils/FormUtils";
import { CattleHelper } from "../helpers/CattleHelper";
import { CattleModel } from "../models/CattleModel";
import "../../../styles/UpdateCattle.css";

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

  const submitForm = async (cattle: CattleModel) => {
    if (id) {
      cattleHelper
        .updateCattleId(cattle)
        .then(() =>
          //toast sucess
          {
            navigate("/private/cattles");
          }
        )
        .catch((err) => {
          //TODO: Mensagem de erro
          //toast erro
          console.error(err);
          toast.error(getFireError(err));
        });
    }
  };

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
          onSubmit={submitForm}
          validationSchema={CattleValidatorSchema}
          initialValues={initialValues}
        >
          {(formik) => (
            <div id="MainBlock-UpdateCattle">
              <div className="Block-Txt-Line">
                <h2 className="Block-Line">
                  <span className="Block-Txt">
                    Editar dados do animal &gt; {initialValues.name}
                  </span>
                </h2>
              </div>

              <form id="Block-EditAnimalData" onSubmit={formik.handleSubmit}>
                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                >
                  <TextField
                    style={{ width: 310, margin: "0.6%" }}
                    label="Nome"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...getControls(formik, "name")}
                  />

                  <TextField
                    style={{ width: 219, margin: "0.6%" }}
                    label="Identificador"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...getControls(formik, "identifier")}
                  />

                  <FormControl>
                    <TextField
                      style={{ width: 230, margin: "2.6%  3%" }}
                      select
                      {...getControls(formik, "sex")}
                      label="Sexo"
                    >
                      <MenuItem value={1}>MACHO</MenuItem>
                      <MenuItem value={2}>FÊMEA</MenuItem>
                    </TextField>
                  </FormControl>
                  <TextField
                    style={{ width: 227, marginLeft: "2%", marginTop: 6 }}
                    label="Peso"
                    {...getControls(formik, "weigth")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="number"
                  />

                  <TextField
                    style={{ width: 347, marginTop: 6, marginLeft: 6 }}
                    label="Data de Nascimento"
                    type="date"
                    {...getControls(formik, "birthday")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: 290,
                      margin: "- 0.6%",
                      marginLeft: "0.4%",
                      marginRight: "1%",
                      marginTop: 0.2,
                    }}
                  >
                    <TextField
                      select
                      {...getControls(formik, "type")}
                      label="Tipo"
                      style={{ width: 333, margin: "2% 0.6%", marginTop: 4 }}
                    >
                      <MenuItem value={1}>Gado de Corte</MenuItem>
                      <MenuItem value={2}>Gado Leitero</MenuItem>
                    </TextField>
                  </FormControl>
                  <TextField
                    label="Quantidade de cria"
                    type="number"
                    {...getControls(formik, "qtyChildren")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: 320, marginTop: 5.9, marginLeft: 4 }}
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

                      <Button variant="contained" color="success" type="submit">
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
