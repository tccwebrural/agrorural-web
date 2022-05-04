import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { ReactElement, useState } from "react";
import "../../../styles/ResetPw.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";
import { Formik } from "formik";
import { ResetPwValidatorSchema } from "../validators/ResetPwValidatorSchema";
import { getControls } from "utils/FormUtils";
import logoPequena from "../../../../../assets/logoPequena.png";
import footer from "../../../../../assets/footer.png";

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

  // const submitResetPassword = (email: string) => {
  //   auth.sendPasswordReset(email).then(() => {
  //     if (email) {
  //       navigate("/sign-in");
  //     }
  //   });
  // };
  console.log(initialValue);
  const submitForm = (email: PasswordResetModel) => {
    auth
      .sendPasswordReset(email.email)

      .then(() =>
        //toast sucess
        navigate("/sign-in")
      );

    // .catch((err) => {
    //   //TODO: Mensagem de erro
    //   //toast erro
    //   console.error(err);
    //   toast.error(getFireError(err));
    // });
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        onSubmit={submitForm}
        initialValues={initialValue}
        validationSchema={ResetPwValidatorSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div id="Block-ResetPassword">
              <img style={{width:300,marginTop:"6%"}} src={logoPequena}  />
  
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
                  style={{ width: "95%", marginTop: "10%" }}
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
                  >
                    Recuperar acesso
                  </Button>
                </Stack>
                <Link id="link-VoltarResetPw" to="/sign-in">
                  Voltar
                </Link>
              </Box>
            </div>
            <img style={{marginTop:"30%", width:"100%"}} src={footer} alt="" />
          </form>
           
        )}
      </Formik>
    </>
  );
};

export default ResetPwPage;
