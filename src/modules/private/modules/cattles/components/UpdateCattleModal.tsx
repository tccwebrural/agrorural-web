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
import React, { ReactElement } from "react";
import { string } from "yup/lib/locale";
import vaca_com_chifre_andando from "../../../../../assets/vaca-com-chifre-andando.png";
import bezerro from "../../../../../assets/bezerro.png";
import "../styles/UpdateCattleModal.css";
const UpdateCattleModal = (): ReactElement => {
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
  //     <Typography variant="h3">Modal</Typography>
  //   </Box>
  // );
  const salvarDadosAnimal = (e: any) => {
    alert("Dados Atualizados com Sucesso");
  };
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
          <form id="Block-EditAnimalData">
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 260 }}>
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
                style={{ width: 270 }}
                label="Identificador"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{ width: 300 }}
                label="Nome"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{ width: 280 }}
                label="Data de Nascimento"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl sx={{ m: 1, minWidth: 271 }}>
                <InputLabel htmlFor="type">Tipo</InputLabel>
                <Select label="Grouping" name="type">
                  <MenuItem value={1}>Gado de Corte</MenuItem>
                  <MenuItem value={2}>Gado Leitero</MenuItem>
                </Select>
              </FormControl>

              <TextField
                style={{ width: 279 }}
                label="Peso"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
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
                    // component={Link}
                    // to="/animals/list"
                  >
                    Cancelar
                  </Button>

                  <Button
                    variant="contained"
                    color="success"
                    onClick={salvarDadosAnimal}
                    sx={{ paddingTop: 2.3, paddingBottom: 2.3 }}
                  >
                    Atualizar
                  </Button>
                </Grid>
              </div>
            </Box>
          </form>
        </div>
      </Box>
    </>
  );
};

export default UpdateCattleModal;
