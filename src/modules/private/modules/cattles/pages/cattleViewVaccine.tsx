import {
  Box,
  Button,
  Checkbox,
  Container,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { ReactElement } from "react";
import { BsPrinter } from "react-icons/bs";
import { MdCoronavirus } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../../styles/cattleViewVaccine.css";

function imprimir() {
  window.print();
}

const cattleViewVaccine = (): ReactElement => {
  return (
    <>
      <Container
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
      >
        <div id="blocoGeralVacina">
          <section>
            <div id="blocoTitulo-criacao">
              <h2 id="blocoTituloTxt-criacao">Minha Criação &gt; Gado</h2>
              <span id="blocoTituloLine-criacao">
                <abbr title="Imprimir">
                  <Fab id="icone" onClick={imprimir}>
                    <BsPrinter size={20} />
                  </Fab>
                </abbr>
              </span>
            </div>

            <div id="infoGado">
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
                    />
                  </Grid>
                  <Grid sx={{ margin: "1%" }}>
                    <TextField
                      style={{ width: 80 }}
                      id="outlined-disabled"
                      label="Peso"
                      type="number"
                    />
                  </Grid>
                  <Grid sx={{ margin: "1%" }}>
                    <FormControl sx={{ minWidth: 221 }}>
                      <InputLabel>Tipo</InputLabel>
                      <Select label="Grouping" name="type">
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid sx={{ margin: "1%" }}>
                    <TextField
                      style={{ width: 100 }}
                      id="Qtd de Cria"
                      label="Qtd de Cria"
                      type="number"
                    />
                  </Grid>
                  <Grid sx={{ margin: "1%" }}>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel htmlFor="type">Sexo</InputLabel>
                      <Select label="Grouping" name="type">
                        <MenuItem value={1}>Macho</MenuItem>
                        <MenuItem value={2}>Femea</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </FormControl>
              </Box>
            </div>
          </section>

          <section>
            <div>
              <div id="blocoTitulo-vacina">
                <h2 id="blocoTituloTxt-vacina">Cartao de Vacina</h2>
                <span id="blocoTituloLine-vacina"></span>
              </div>
              <div id="infoGado">
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
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
                      <TextField
                        style={{ width: 150 }}
                        id="outlined-disabled"
                        label="Lote"
                        type="number"
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
                      <TextField
                        style={{ width: 180 }}
                        id="outlined-disabled"
                        label="Fabricante"
                        type="text"
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
                      <TextField
                        style={{ width: 180 }}
                        id="outlined-disabled"
                        label="Data da Aplicação"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid sx={{ margin: "1%" }}>
                      <TextField
                        style={{ width: 180 }}
                        id="outlined-disabled"
                        label="Data da Validade"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </FormControl>
                </Box>
              </div>
              <div id="blocoVacinas">
                <Grid id="vacinas">
                  <MdCoronavirus size={80} />
                  <p>Virus 1</p>
                  <Checkbox />
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
export default cattleViewVaccine;
