import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { auth } from "configs/Firebase";
import { Formik } from "formik";
import { PerfilModelUser, UserModel } from "modules/public/models/UserModel";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProviderAuth, useAuth } from "providers/AuthProvider";

import logoPequena from "../../../../../assets/logoPequena.png";
import toast from "react-hot-toast";

const ModalEditarPerfil = (): ReactElement => {
  const [initialValues, setInitialValues] = useState<PerfilModelUser>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    farmName: "",
  });

  // const [initialValues, setInitialValues] = useState<UserModel>();
  const loadingHelper = useGlobalLoading();

  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();

  console.log(id);
  useEffect(() => {
    auth.getUser().then((user?: UserModel) => {
      if (user) {
        toast.success("Perfil carregado!");
        setInitialValues(user);
      } else {
        //TODO: Volta para listagem
        toast.error("Erro ao carregar  credenciais");
      }
      loadingHelper.stopLoading();
    });
  }, []);

  const submitForm = (user: PerfilModelUser) => {
    // user. = id;
  };
  const [openModalEditarPerfil, setOpenEditar] = React.useState(false);
  const handleOpenModalEditar = () => setOpenEditar(true);
  const handleCloseEditarPerfil = () => setOpenEditar(false);

  return (
    <Formik
      enableReinitialize={true}
      onSubmit={submitForm}
      initialValues={initialValues}
    >
      {(formik) => (
        <Modal open={openModalEditarPerfil} onClose={handleCloseEditarPerfil}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              height: 520,
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: 11,
              p: 4,
            }}
          >
            <div>
              <div id="logoPequena-EditarPerfil">
                <img src={logoPequena} alt="Erro..." />
              </div>
              <div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0% 10%",
                  }}
                >
                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "1% 0%" }}
                      label="Proprietário da fazenda"
                      type="text"
                    />
                  </Grid>

                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "1% 0%" }}
                      label="Nome da Fazenda"
                      type="text"
                    />
                  </Grid>

                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "1% 0%" }}
                      label="Telefone"
                      type="text"
                    />
                  </Grid>

                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "1% 0%" }}
                      label="CPF"
                      type="number"
                    />
                  </Grid>

                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "1% 0%" }}
                      label="Email"
                      type="email"
                    />
                  </Grid>
                </Box>
              </div>
              <div id="btn-EditarModal">
                <Grid sx={{ margin: " 0% 2% " }}>
                  <Button
                    id="btn-Cancelar"
                    onClick={() => handleCloseEditarPerfil()}
                  >
                    Cancelar
                  </Button>{" "}
                </Grid>
                <Grid>
                  <Button
                    id="btn-Salvar"
                    onClick={() => handleCloseEditarPerfil()}
                  >
                    Salvar
                  </Button>{" "}
                </Grid>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </Formik>
  );
};
export default ModalEditarPerfil;
