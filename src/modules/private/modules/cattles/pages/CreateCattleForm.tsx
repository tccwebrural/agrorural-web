import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  TextField,
  Stack,
  Button,
  Paper,
  styled,
} from "@mui/material";

import { Timestamp } from "firebase/firestore";
import { FarmModel } from "modules/private/models/FarmModel";
import React, { ReactElement, useState } from "react";
import { CattleHelper } from "../helpers/CattleHelper";
import {
  CattleDethTypes,
  CattleModel,
  CattleSexs,
  CattleTypes,
} from "../models/CattleModel";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import bezerro from "../../../../../assets/bezerro.png";
import "../../../styles/CattleForm.css";
import { getControls } from "../../../../../utils/FormUtils";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TodayTwoTone } from "@mui/icons-material";
import { object } from "yup/lib/locale";
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: "auto",
  marginTop: 32,
  maxWidth: 928,
  height: 390,
  borderTop: 2,
}));

const CreateCattleFormPage = (): ReactElement => {
  const cattlehelpers = CattleHelper();

  const [cattles, setCattle] = useState<CattleModel>();

  const navigate = useNavigate();
  // DateTime convertedDateTime = DateTime.parse('2022-01-10 00:00:00');
  // Timestamp convertedDateTimeStamp = Timestamp.fromDate(convertedDateTime)

  const convertedDateTime = Timestamp.now();

  const formCattle = useFormik({
    initialValues: {
      id: "",
      weigth: parseInt(""),
      name: "",
      type: CattleTypes.CORTE,
      birthday: undefined,
      sex: CattleSexs.MACHO || CattleSexs.FEMEA,
      qtyChildren: parseInt(""),
    },
    // validationSchema: RegisterValidatorSchema,
    onSubmit: async (formValue: CattleModel) => {
      cattlehelpers
        .createCattle(formValue)
        .then(() => navigate("/private/cattles"));
    },
  });
  const cattle = {
    // id: "",
    birthday: Timestamp.now(),
    name: "animal de 6 patas",
    qtyChildren: 40,
    sex: CattleSexs.MACHO,
    type: CattleTypes.CORTE,
    weigth: 100,
    // createdAt: Timestamp.now(),
    // deathBy: CattleDethTypes.CONSUMO_PROPRIO,
  };

  // const farm = {
  //   id: "string";
  // name!: "string";
  // createdAt!: Timestamp;
  // owner!: DocumentReference;
  // }

  const createAnimal = () => {
    cattlehelpers.createCattle(cattle);
  };

  const deleteAnimal = () => {
    cattlehelpers.deleteCattleId("eve21vrsr7h1feDwROXT");
  };
  // const getAnimal = () => {
  //   cattlehelpers.getAllCattles();
  // };

  const updateAnimal = () => {
    cattlehelpers.updateCattleId(cattle, "3NeD9tU2vWmQBwFVQvf1");
  };

  // const getAllAnimal = () => {
  //   cattlehelpers.getAllCattles(farm);
  // };
  // return (
  //   <Box
  //     sx={{
  //       flexGrow: 1,
  //       backgroundColor: "whitesmoke",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <Typography variant="h3">CattleForm</Typography>
  //     <button onClick={updateAnimal}> ok</button>
  //   </Box>
  // );
  return (
    <>
      <div className="MainBlock">
        <div className="Block-Txt-Line">
          <h2 className="Block-Line">
            {/* <span className="Block-Txt">Minha Criação &gt; Cadastrar Gado</span> */}
            <span className="Block-Txt">Cadastrar Gado</span>
          </h2>
        </div>
        <Box sx={{ "& .MuiTextField-root": { m: 1, width: "33ch" } }}>
          <Grid>
            <Item id="AnimalRegister-Form">
              <FormControl sx={{ m: 1, minWidth: 255 }}>
                <InputLabel htmlFor="grouped-select">Categoria</InputLabel>
                <Select
                  {...getControls(formCattle, "sex")}
                  label="Grouping"
                  // name="category"
                >
                  <MenuItem value={1}>Vaca</MenuItem>
                  <MenuItem value={2}>Boi</MenuItem>
                  <MenuItem value={3}>Bezerra</MenuItem>
                  <MenuItem value={4}>Bezerro</MenuItem>
                  <MenuItem value={5}>Novilha</MenuItem>
                  <MenuItem value={6}>Novilho</MenuItem>
                </Select>
              </FormControl>

              <TextField
                // disabled
                label="Identificador"
                type="number"
                // name="identifier"
                {...getControls(formCattle, "id")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 268 }}
              />

              <TextField
                label="Nome"
                type="text"
                {...getControls(formCattle, "name")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 340 }}
              />

              <TextField
                label="Data de Nascimento"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                // name="birthday"
                {...getControls(formCattle, "birthday")}
              />
              <FormControl sx={{ m: 1, minWidth: 270 }}>
                <InputLabel htmlFor="type">Tipo</InputLabel>
                <Select
                  {...getControls(formCattle, "type")}
                  label="Grouping"
                  // name="type"
                >
                  <MenuItem value={1}>Gado de Corte</MenuItem>
                  <MenuItem value={2}>Gado Leitero</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Peso Aproximadamente"
                type="number"
                {...getControls(formCattle, "weight")}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Stack direction="row" spacing={2}>
                <Grid container justifyContent="flex-end">
                  <Stack spacing={2} direction="row" sx={{ marginRight: 1 }}>
                    <div id="Block-CowImage-Form">
                      <img
                        id="CowImage-Form"
                        src={vaca_com_chifre_andando}
                        alt="vaca"
                      />
                    </div>
                    <div id="Block-CalfImage-Form">
                      <img id="CalfImage-Form" src={bezerro} alt="bezerro" />
                    </div>
                    <div id="Btns-SaveCancel-Form">
                      <Button
                        sx={{ marginRight: 1 }}
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
                        sx={{ paddingTop: 2.3, paddingBottom: 2.3 }}
                        type="submit"
                      >
                        Salvar
                      </Button>
                    </div>
                  </Stack>
                </Grid>
              </Stack>
            </Item>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default CreateCattleFormPage;
