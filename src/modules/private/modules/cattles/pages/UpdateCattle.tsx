import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Timestamp } from "firebase/firestore";
import React, { ReactElement, useEffect, useState } from "react";
import { string } from "yup/lib/locale";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import bezerro from "../../../../../assets/bezerro.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/UpdateCattle.css";
import { CattleHelper } from "../helpers/CattleHelper";
import { CattleModel } from "../models/CattleModel";
import { CattleValidatorSchema } from "modules/public/modules/authentication/validators/CattleValidatorSchema";
import { useFormik } from "formik";
import { getControls } from "../../../../../utils/FormUtils";

const UpdateCattle = (): ReactElement => {
  const salvarDadosAnimal = (e: any) => {
    alert("Dados Atualizados com Sucesso");
  };
  const cattlehelpers = CattleHelper();

  const [animals, setAnimals] = useState<CattleModel[]>([]);

  const navigate = useNavigate();
  const params = useParams();

  //   useEffect(() => {
  //     cattlehelpers.getAllCattles().then((animals) => setAnimals(animals));
  //   }, []);
  useEffect(() => {
    if (params.cattleId) {
      cattlehelpers.getCattleId(params.cattleId);
    }
  }, []);
  console.log(useEffect);

  const tst = () => {
    // if (params.cattleId) {
    //   cattlehelpers.getCattleId(params.cattleId);
    // }
    cattlehelpers.getAllCattles();
  };

  console.log(tst);
  const formCattle = useFormik({
    initialValues: {
      identifier: 0,
      weigth: 0,
      name: "",
      type: 1,
      birthday: "",
      sex: 1,
      qtyChildren: 0,
    },

    // validateOnChange:{
    //     setAnimals
    // }
    validationSchema: CattleValidatorSchema,

    onSubmit: async (formValue: CattleModel) => {
      // Date.UTC(""),

      if (params.id) {
        cattlehelpers
          .updateCattleId(formValue, params.id)
          .then(() => navigate("/private/cattles"));
      }
      //   cattlehelpers
      //     .updateCattleId(formValue, "9YJqnJspxVO7FgV9Q7zn")
      //     .then(() => navigate("/private/cattles"));
    },
  });
  console.log(params);
  console.log();
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "block",
          justifyContent: "center",
        }}
      >
        <div className="MainBlock">
          <div className="Block-Txt-Line">
            <h2 className="Block-Line">
              <span className="Block-Txt">
                Minha Criação &gt; Atualizar Gado
              </span>
            </h2>
          </div>
          <form id="Block-EditAnimalData" onSubmit={formCattle.handleSubmit}>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 260 }}>
                <InputLabel htmlFor="grouped-select">Sexo</InputLabel>

                <Select
                  {...getControls(formCattle, "sex")}
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
                {...getControls(formCattle, "identifier")}
              />
              <TextField
                style={{ width: 300 }}
                label="Nome"
                InputLabelProps={{
                  shrink: true,
                }}
                {...getControls(formCattle, "name")}
              />
              <TextField
                style={{ width: 280 }}
                label="Data de Nascimento"
                type="date"
                {...getControls(formCattle, "birthday")}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl sx={{ m: 1, minWidth: 271 }}>
                <InputLabel htmlFor="type">Tipo</InputLabel>
                <Select
                  {...getControls(formCattle, "type")}
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
                {...getControls(formCattle, "weight")}
                type="string"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                // disabled
                label="Quantidade de cria"
                type="number"
                // name="identifier"
                {...getControls(formCattle, "qtyChildren")}
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
          <Button
            variant="contained"
            color="success"
            // onClick={salvarDadosAnimal}
            onSubmit={tst}
            sx={{ paddingTop: 2.3, paddingBottom: 2.3 }}
          >
            VER
          </Button>
        </div>
      </Box>
    </>
  );
};

export default UpdateCattle;
