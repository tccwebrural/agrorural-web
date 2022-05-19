import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../providers/AuthProvider";
import { getControls } from "../../../../../utils/FormUtils";
import { LoginValidatorSchema } from "../validators/LoginValidatorSchema";
import { Toaster } from "react-hot-toast";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { trackPromise } from "react-promise-tracker";
import { GLOBAL_LOADING_KEY } from "../../../../../constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import footer from "../../../../../assets/footer.png";
import vaca1 from "../../../../../assets/vaca1.png";
import vaca2 from "../../../../../assets/vaca2.png";
import logoPequena from "../../../../../assets/logoPequena.png";

import "../../../styles/Login.css";

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
      // loadingHelper.startLoading();
      // await authContext.signIn(formValue.email, formValue.password).then(() => {
      //   navigate("/private");
      //   loadingHelper.stopLoading();
      // });

      trackPromise(
        authContext.signIn(formValue.email, formValue.password).then(() => {
          navigate("/private");
        }),
        GLOBAL_LOADING_KEY
      );
      // .catch() {
      //   loadingHelper.stopLoading()
      // };
    },
  });

  const [show, setShow] = useState(false);

  const handleClickPw = (e: any) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <>
      <div id="Footer">
        <img src={footer} alt="Erro..." />
      </div>
      <div id="Vaca1">
        <img src={vaca1} alt="Erro..." />
      </div>
      <div id="Vaca2">
        <img src={vaca2} alt="Erro..." />
      </div>

      <Container>
        <section>
          <div id="Block-TelaLogin">
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
                <Grid sx={{ position: "relative" }}>
                  <TextField
                    sx={{ width: "300px" }}
                    type={show ? "text" : "password"}
                    label="Senha"
                    variant="outlined"
                    {...getControls(formLoginUser, "password")}
                  />
                  <div id="showPassword">
                    {show ? (
                      <abbr title="Ocultar senha">
                        <VisibilityIcon
                          onClick={handleClickPw}
                          style={{ color: "var(--cor003)" }}
                        />
                      </abbr>
                    ) : (
                      <abbr title="Exibir senha">
                        <VisibilityOffIcon
                          style={{ color: "var(--cor033)" }}
                          onClick={handleClickPw}
                        />
                      </abbr>
                    )}
                  </div>
                </Grid>

                <Grid sx={{ margin: "4% 0%", textAlign: "center" }}>
                  <Button id="btnLogin" variant="contained" type="submit">
                    Entrar
                  </Button>
                </Grid>
                <Grid sx={{ margin: "3% 0%", textAlign: "center" }}>
                  <span>
                    Você ainda não tem conta?
                    <Link to="/sign-up"> Cadastre-se</Link>
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
