import {
  Box,
  Button,
  Checkbox,
  Container,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { MdCoronavirus } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/CattleEditVacine.css";
const label = { inputProps: { "aria-label": "" } };
import vaca1 from "../../../../../assets/vaca1.png";
import { VacineHelper } from "../helpers/VacineHelpers";
import { VacineModel } from "../models/VacineModel";

const CattleEditVaccine = (): ReactElement => {
  function UpdateVaccineData() {
    alert("Dados atualizados");
  }

  const vacineHelpers = VacineHelper();

  const [initialValues, setInitialValues] = useState<VacineModel>({
    date_application: "",
    expiration_date: "",
    lote: "",
    manufacturer: "",
    name: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // const submitForm = (vacine: VacineModel) => {
  //   vacine.id = id;
  //   vacineHelpers
  //     .updateVacineId(vacine, vacine)

  //     .catch((err) => {
  //       //TODO: Mensagem de erro
  //       //toast erro
  //       console.error(err);
  //       toast.error(getFireError(err));
  //     });
  // };
  return (
    <>
      <div id="MainBlock-EditVaccine">
        <Container
          sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
        >
          <section>
            <div id="Block-Txt-Line-EditVacine">
              <h2 id="Block-TxtEditVacine">Editar Dados da Vacina</h2>
              <span id="Block-LineEditVacine"></span>
            </div>
            <div id="Block-InputEditVacine">
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
            <div id="Block-TypeVaccine-EditVaccine">
              <Grid id="TypeVaccine-EditVaccine">
                <VaccinesIcon
                  style={{
                    fontSize: 75,
                    margin: "auto",
                    marginTop: 10,
                  }}
                />
                <p>Virus 1</p>
                <Checkbox
                  {...label}
                  sx={{ fontSize: 28, margin: "auto", marginTop: -1 }}
                />
              </Grid>
              <Grid id="TypeVaccine-EditVaccine">
                <MdCoronavirus style={{ marginTop: 5 }} size={80} />
                <p>Virus 2</p>
                <Checkbox
                  {...label}
                  sx={{ fontSize: 28, margin: "auto", marginTop: -1 }}
                />
              </Grid>
            </div>
            <div id="CowImage-EditVaccine">
              <img style={{ width: 300 }} src={vaca1} alt="Erro..." />
            </div>
            <Grid id="btn-SaveCancel-EditVacine" item xs={2} sx={{ margin: 1 }}>
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                color="error"
                component={Link}
                to="/private/cattle/:id/Vaccine"
              >
                Cancelar
              </Button>

              <Button
                sx={{ margin: 1, marginLeft: 0 }}
                variant="contained"
                color="success"
                onClick={UpdateVaccineData}
              >
                Atualizar
              </Button>
            </Grid>
          </section>
        </Container>
      </div>
    </>
  );
};
export default CattleEditVaccine;
