import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Box,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";
import { Formik } from "formik";
import { ResetPwValidatorSchema } from "../validators/ResetPwValidatorSchema";
import { getControls } from "utils/FormUtils";

import logoPequena from "../../../../../assets/logoPequena.png";
import footer from "../../../../../assets/footer.png";

import "../../../styles/ResetPw.css";

import {
  PasswordResetModel,
  RegisterUserModel,
  UserModel,
} from "modules/public/models/UserModel";
import toast from "react-hot-toast";
import { getFireError } from "utils/HandleFirebaseError";

const ResetPwPage = (): ReactElement => {
  const auth = useAuth();
  const [initialValue, setInitialValue] = useState<PasswordResetModel>({
    email: "",
  });
  const navigate = useNavigate();

  console.log(initialValue);
  const submitForm = (email: PasswordResetModel) => {
    auth
      .sendPasswordReset(email.email)

      .then(() =>
        //toast sucess
        navigate("/sign-in")
      );
  };

  const [open, setOpen] = React.useState(false);
  const handleOpenModalResetPw = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <>
      {/* <div>
        <Modal open={open} onClose={handleCloseModal}>
          <Box
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
            }}
          >
            <div id="ModalBlocoGeral">
              <h2>Foi enviado um Codigo para o Seu E-mail</h2>
              <p id="ModalBlocoText">
                Foi enviado um Codigo de redefinição de senha para o seu Email
              </p>
              <div id="ModalBlocoButton">
                <Button
                  id="btnModal"
                  variant="contained"
                  onClick={handleCloseModal}
                >
                  OK
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div> */}

      <Formik
        enableReinitialize={true}
        onSubmit={submitForm}
        initialValues={initialValue}
        validationSchema={ResetPwValidatorSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div id="Block-ResetPassword">
              <img style={{ width: 300, marginTop: "6%" }} src={logoPequena} />

              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <h2 id="Txt-ForgotPassword">Esqueceu sua senha? </h2>
                <p id="Txt-ResetPw">
                  Para recuperar sua senha preencha o campo com o e-mail
                  cadastrado no AgroRural.
                </p>

                <TextField
                  type="email"
                  {...getControls(formik, "email")}
                  placeholder="E-mail cadastrado"
                  style={{ width: "95%", marginTop: "6%" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <Stack spacing={2} direction="row">
                  <Button
                    id="btn-ResetPassword"
                    variant="contained"
                    type="submit"
                    onClick={handleOpenModalResetPw}
                  >
                    Recuperar acesso
                  </Button>
                </Stack>
                <Link id="link-VoltarResetPw" to="/sign-in">
                  Voltar
                </Link>
              </Box>
            </div>
            <img
              style={{ width: "100vw", position: "absolute", bottom: "0" }}
              src={footer}
              alt=""
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default ResetPwPage;
