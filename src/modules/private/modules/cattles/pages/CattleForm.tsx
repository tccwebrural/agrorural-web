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
import React, { ReactElement } from "react";
import { CattleHelper } from "../helpers/CattleHelper";
import {
  CattleDethTypes,
  CattleSexs,
  CattleTypes,
} from "../models/CattleModel";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import bezerro from "../../../../../assets/bezerro.png";
import "../styles/CattleForm.css";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: "auto",
  marginTop: 32,
  maxWidth: 928,
  height: 390,
  borderTop: 2,
}));

const CattleFormPage = (): ReactElement => {
  const cattlehelpers = CattleHelper();

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
            <span className="Block-Txt">Minha Criação &gt; Cadastrar Gado</span>
          </h2>
        </div>
        <Box sx={{ "& .MuiTextField-root": { m: 1, width: "33ch" } }}>
          <Grid>
            <Item id="AnimalRegister-Form">
              <FormControl sx={{ m: 1, minWidth: 255 }}>
                <InputLabel htmlFor="grouped-select">Categoria</InputLabel>
                <Select label="Grouping" name="category">
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
                name="identifier"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 268 }}
              />

              <TextField
                label="Nome"
                type="text"
                name="name"
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
                name="birthday"
              />
              <FormControl sx={{ m: 1, minWidth: 270 }}>
                <InputLabel htmlFor="type">Tipo</InputLabel>
                <Select label="Grouping" name="type">
                  <MenuItem value={1}>Gado de Corte</MenuItem>
                  <MenuItem value={2}>Gado Leitero</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Peso Aproximadamente"
                name="weight"
                type="number"
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
                        // component={Link}
                        // to="/animals/list"
                      >
                        Cancelar
                      </Button>

                      <Button
                        variant="contained"
                        color="success"
                        sx={{ paddingTop: 2.3, paddingBottom: 2.3 }}
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

export default CattleFormPage;
