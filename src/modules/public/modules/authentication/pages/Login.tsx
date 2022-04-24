import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { ReactElement, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoMd from "../../../../../assets/logo-md.svg";
import { useAuth } from "../../../../../providers/AuthProvider";
import { getControls } from "../../../../../utils/FormUtils";
import { LoginValidatorSchema } from "../validators/LoginValidatorSchema";
import "../../../styles/Login.css";
import footer from "../../../../../assets/footer.png";
import vaca3 from "../../../../../assets/vaca3.png";
import vaca4 from "../../../../../assets/vaca4.png";
import logoPequena from "../../../../../assets/logoPequena.png";
import { Toaster } from "react-hot-toast";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
const LoginPage = (): ReactElement => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const loadingHelper = useGlobalLoading();

  useEffect(() => {
    authContext.logout(false);
  }, []);

  const formLoginUser = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidatorSchema,
    onSubmit: async (formValue) => {
      loadingHelper.startLoading();
      await authContext.signIn(formValue.email, formValue.password);
      navigate("/private");
      loadingHelper.stopLoading();
    },
  });

  return (
    <>
      <div id="imgFooter">
        <img src={footer} alt="" />
      </div>
      <div id="imgVaca1">
        <img src={vaca4} alt="" />
      </div>
      <div id="imgVaca2">
        <img src={vaca3} alt="" />
      </div>

      <Container>
        <section>
          <div id="logi">
            <div id="logoPequena">
              <img src={logoPequena} alt="Erro..." />
            </div>
            <form id="form" onSubmit={formLoginUser.handleSubmit}>
              <Box>
                <Grid sx={{ margin: "3% 0%", textAlign: "center" }}>
                  <TextField
                    sx={{ width: "300px" }}
                    type="email"
                    label="E-mail"
                    variant="outlined"
                    {...getControls(formLoginUser, "email")}
                  />
                </Grid>
                <Grid sx={{ margin: "3% 0%", textAlign: "center" }}>
                  <TextField
                    sx={{ width: "300px" }}
                    type="Password"
                    label="Senha"
                    variant="outlined"
                    {...getControls(formLoginUser, "password")}
                  />
                </Grid>
                <Grid sx={{ margin: "4% 0%", textAlign: "center" }}>
                  <Button variant="contained" type="submit">
                    Entrar
                  </Button>
                </Grid>
                <Grid sx={{ margin: "3% 0%", textAlign: "center" }}>
                  <span>
                    Você ainda não tem conta?
                    <Link to="/sign-up">Registre-se</Link>.
                  </span>
                </Grid>
                <Grid sx={{ margin: "3% 0%", textAlign: "center" }}>
                  <span>
                    <Link to="/reset">Esqueci minha senha</Link>
                  </span>
                </Grid>
              </Box>
            </form>
          </div>
        </section>
      </Container>
    </>
  );
};
export default LoginPage;
