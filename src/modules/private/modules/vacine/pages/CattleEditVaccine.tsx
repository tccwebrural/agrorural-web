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
import React, { ReactElement, useEffect, useState } from "react";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { MdCoronavirus } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/CattleEditVacine.css";
const label = { inputProps: { "aria-label": "" } };
import vaca1 from "../../../../../assets/vaca1.png";
import { VacineHelper } from "../helpers/VacineHelpers";
import { VacineModel } from "../models/VacineModel";
import toast from "react-hot-toast";
import { getFireError } from "utils/HandleFirebaseError";
import { Formik } from "formik";
import { VacineValidatorSchema } from "../validators/VacineValidatorSchema";
import { getControls } from "utils/FormUtils";

const CattleEditVaccine = (): ReactElement => {
  function UpdateVaccineData() {
    alert("Dados atualizados");
  }

  const vacineHelpers = VacineHelper();

  const [initialValues, setInitialValues] = useState<VacineModel>({
    date_application: "",
    expiration_date: "",
    lote: 0,
    manufacturer: "",
    name: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { idVacine } = useParams();

  console.log("ID VACINA " + "= " + idVacine);

  console.log(vacineHelpers.getAllVacines("1DpbNDXAu4ebmAZKgOb7"));
  console.log(id);

  useEffect(() => {
    // if (id) {
    //   cattleHelper.getCattleById(id).then((cattle?: CattleModel) => {
    //     if (cattle) {
    //       setInitialValues(cattle);
    //     } else {
    //       //TODO: Volta para listagem
    //       toast.error("VACA NAO ENCONTRADA");
    //     }
    //     loadingHelper.stopLoading();
    //   });
    // } else {
    //   //TODO: Volta para listagem
    //   loadingHelper.stopLoading();
    // }
    if (id && idVacine) {
      vacineHelpers.getVacineById(idVacine, id).then((vacine?: VacineModel) => {
        if (vacine) {
          setInitialValues(vacine);
        } else {
          //TODO: Volta para listagem
          toast.error("vacina NAO ENCONTRADA");
        }
      });
    } else {
      //TODO: Volta para listagem
    }
  }, []);

  const getActualVacine = (vacine: VacineModel) => {
    navigate(`/private/cattle/${id}/vacine/${vacine.id}/edit`);
  };
  const submitForm = (vacine: VacineModel) => {
    if (id && idVacine) {
      vacineHelpers.updateVacineId(vacine, id, idVacine).then(() =>
        //toast sucess
        navigate(`/private/cattle/${id}/Vaccine`)
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Formik
          enableReinitialize={true}
          onSubmit={submitForm}
          validationSchema={VacineValidatorSchema}
          initialValues={initialValues}
        >
          {(formik) => (
            <div id="MainBlock-VaccineForm">
              <div className="Block-Txt-Line">
                <h2 className="Block-Line">
                  <span className="Block-Txt">
                    Editar Vacina : {initialValues.name}
                  </span>
                </h2>
              </div>
              <div id="Block-AnimalData">
                <form onSubmit={formik.handleSubmit}>
                  <Box
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                  >
                    <TextField
                      style={{ width: 220 }}
                      label="Nome"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "name")}
                    />
                    <TextField
                      style={{ width: 140 }}
                      label="Lote"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "lote")}
                    />
                    <TextField
                      style={{ width: 200 }}
                      label="Fabricante"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "manufacturer")}
                    />
                    <TextField
                      style={{ width: 180 }}
                      label="Data de Aplicação"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "date_application")}
                    />
                    <TextField
                      style={{ width: 180 }}
                      label="Validade da Vacina"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getControls(formik, "expiration_date")}
                    />
                    <div id="Block-VaccineIcons">
                      <fieldset id="FieldVaccineIcons">
                        <abbr title="Vacina contra doenças">
                          <VaccinesIcon
                            style={{
                              fontSize: 75,
                              marginTop: 10,
                              marginLeft: 35,
                            }}
                          />
                        </abbr>
                        <p id="VacinaIcon-Txt">Vírus 1</p>
                        <Checkbox
                          {...label}
                          sx={{ fontSize: 28, marginLeft: 6.5, marginTop: -1 }}
                        />
                      </fieldset>

                      <fieldset id="FieldVirus">
                        <abbr title="Vacina contra vírus">
                          <MdCoronavirus
                            size={80}
                            style={{ marginTop: 5, marginLeft: 35 }}
                          />
                        </abbr>
                        <p id="VacinaIcon-Txt">Vírus 2</p>
                        <Checkbox
                          {...label}
                          sx={{ fontSize: 28, marginLeft: 6.5, marginTop: -1 }}
                        />
                      </fieldset>
                    </div>

                    <div id="Block-CowImage-CadastroVacina">
                      <img style={{ width: 300 }} src={vaca1} alt="Erro..." />
                    </div>

                    <div id="Btns-Add-Cancel-CadastroVacina">
                      <Grid item xs={2} sx={{ margin: 1 }}>
                        <Button
                          sx={{ margin: 1 }}
                          variant="contained"
                          color="error"
                          component={Link}
                          to={`/private/cattle/${id}/Vaccine`}
                        >
                          Cancelar
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          type="submit"
                          sx={{ paddingTop: 0.8, paddingBottom: 0.8 }}
                        >
                          Atualizar
                        </Button>
                      </Grid>
                    </div>
                  </Box>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </Box>
    </>
  );
  // return (

  //   <>
  //     <div id="MainBlock-EditVaccine">
  //       <Formik
  //         enableReinitialize={true}
  //         onSubmit={submitForm}
  //         validationSchema={VacineValidatorSchema}
  //         initialValues={initialValues}
  //       >
  //         {(formik) => (
  //           <Container
  //             sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
  //           >
  //             <section>
  //               <div id="Block-Txt-Line-EditVacine">
  //                 <h2 id="Block-TxtEditVacine">Editar Dados da Vacina</h2>
  //                 <span id="Block-LineEditVacine"></span>
  //               </div>
  //               <div id="Block-InputEditVacine">
  //                 <form onSubmit={formik.handleSubmit}>
  //                   <Box>
  //                     <FormControl
  //                       sx={{
  //                         display: "flex",
  //                         flexDirection: "row",
  //                         justifyContent: "center",
  //                       }}
  //                     >
  //                       <Grid item xs={2} sx={{ margin: "1%" }}>
  //                         <TextField
  //                           style={{ width: 180 }}
  //                           id="outlined-disabled"
  //                           label="Nome"
  //                           type="text"
  //                           {...getControls(formik, "name")}
  //                         />
  //                       </Grid>
  //                       <Grid sx={{ margin: "1%" }}>
  //                         <TextField
  //                           style={{ width: 150 }}
  //                           id="outlined-disabled"
  //                           label="Lote"
  //                           type="number"
  //                           {...getControls(formik, "lote")}
  //                         />
  //                       </Grid>
  //                       <Grid sx={{ margin: "1%" }}>
  //                         <TextField
  //                           style={{ width: 180 }}
  //                           id="outlined-disabled"
  //                           label="Fabricante"
  //                           type="text"
  //                           {...getControls(formik, "manufacturer")}
  //                         />
  //                       </Grid>
  //                       <Grid sx={{ margin: "1%" }}>
  //                         <TextField
  //                           style={{ width: 180 }}
  //                           id="outlined-disabled"
  //                           label="Data da Aplicação"
  //                           type="date"
  //                           {...getControls(formik, "date_application")}
  //                           InputLabelProps={{
  //                             shrink: true,
  //                           }}
  //                         />
  //                       </Grid>
  //                       <Grid sx={{ margin: "1%" }}>
  //                         <TextField
  //                           style={{ width: 180 }}
  //                           id="outlined-disabled"
  //                           label="Data da Validade"
  //                           type="date"
  //                           {...getControls(formik, "expiration_date")}
  //                           InputLabelProps={{
  //                             shrink: true,
  //                           }}
  //                         />
  //                       </Grid>
  //                     </FormControl>
  //                   </Box>
  //                 </form>
  //               </div>
  //               <div id="Block-TypeVaccine-EditVaccine">
  //                 <Grid id="TypeVaccine-EditVaccine">
  //                   <VaccinesIcon
  //                     style={{
  //                       fontSize: 75,
  //                       margin: "auto",
  //                       marginTop: 10,
  //                     }}
  //                   />
  //                   <p>Virus 1</p>
  //                   <Checkbox
  //                     {...label}
  //                     sx={{ fontSize: 28, margin: "auto", marginTop: -1 }}
  //                   />
  //                 </Grid>
  //                 <Grid id="TypeVaccine-EditVaccine">
  //                   <MdCoronavirus style={{ marginTop: 5 }} size={80} />
  //                   <p>Virus 2</p>
  //                   <Checkbox
  //                     {...label}
  //                     sx={{ fontSize: 28, margin: "auto", marginTop: -1 }}
  //                   />
  //                 </Grid>
  //               </div>
  //               <div id="CowImage-EditVaccine">
  //                 <img style={{ width: 300 }} src={vaca1} alt="Erro..." />
  //               </div>
  //               <Grid
  //                 id="btn-SaveCancel-EditVacine"
  //                 item
  //                 xs={2}
  //                 sx={{ margin: 1 }}
  //               >
  //                 <Button
  //                   sx={{ margin: 1 }}
  //                   variant="contained"
  //                   color="error"
  //                   component={Link}
  //                   to="/private/cattle/:id/Vaccine"
  //                 >
  //                   Cancelar
  //                 </Button>

  //                 <Button
  //                   sx={{ margin: 1, marginLeft: 0 }}
  //                   variant="contained"
  //                   color="success"
  //                   type="submit"
  //                 >
  //                   Atualizar
  //                 </Button>
  //               </Grid>
  //             </section>
  //           </Container>
  //         )}
  //       </Formik>
  //     </div>
  //   </>
  // );
};
export default CattleEditVaccine;
