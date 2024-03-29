import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { PhoneMaskCustom } from "modules/public/components/PhoneMaskComponent";
import { ReactElement, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useNavigate } from "react-router-dom";
import { GLOBAL_LOADING_KEY } from "../../../../../constants";
import { useAuth } from "../../../../../providers/AuthProvider";
import { getControls } from "../../../../../utils/FormUtils";
import { RegisterUserModel } from "../../../models/UserModel";
import { RegisterValidatorSchema } from "../validators/RegisterValidatorSchema";

import footer from "../../../../../assets/footer.png";
import logoPequena from "../../../../../assets/logoPequena.png";
import vaca2 from "../../../../../assets/vaca2.png";
import vaca3 from "../../../../../assets/vaca3.png";

import { CpfMaskComponent } from "modules/public/components/CpfMaskComponent";
import "../../../styles/Register.css";

const RegisterPage = (): ReactElement => {
  const navigate = useNavigate();
  const authContext = useAuth();

  const formRegisterUser = useFormik({
    initialValues: {
      email: "",
      farmName: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      cpf: "",
    },

    //
    validationSchema: RegisterValidatorSchema,
    onSubmit: async (formValue: RegisterUserModel) => {
      trackPromise(
        authContext.signUp(formValue).then(() => navigate("/private/home")),
        GLOBAL_LOADING_KEY
      );
    },
  });
  const [show, setShow] = useState(false);
  const handleClickPw = (e: any) => {
    e.preventDefault();
    setShow(!show);
  };
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const handleClickConfirmPw = (e: any) => {
    e.preventDefault();
    setShowConfirmPw(!showConfirmPw);
  };
  return (
    <>
      <div id="imgFooter">
        <img src={footer} alt="Erro..." />
      </div>
      <div id="imgVaca1">
        <img src={vaca2} alt="Erro..." />
      </div>
      <div id="imgVaca2-Register">
        <img src={vaca3} alt="Erro..." />
      </div>

      <Container>
        <div id="login">
          <div id="logoPequena">
            <img src={logoPequena} alt="Erro..." />
          </div>
          <div id="form-Register">
            <form
              className="register_container"
              onSubmit={formRegisterUser.handleSubmit}
            >
              <Box>
                <Grid>
                  <TextField
                    sx={{ width: "300px", margin: "1% 0%" }}
                    label="Proprietário da fazenda"
                    {...getControls(formRegisterUser, "name")}
                    type="text"
                  />
                </Grid>

                <Grid>
                  <TextField
                    sx={{ width: "300px", margin: "1% 0%" }}
                    label="Nome da fazenda"
                    {...getControls(formRegisterUser, "farmName")}
                    type="text"
                  />
                </Grid>

                <Grid>
                  <TextField
                    sx={{ width: "300px", margin: "1% 0%" }}
                    label="Telefone"
                    type="text"
                    {...getControls(formRegisterUser, "phone")}
                    InputProps={{
                      inputComponent: PhoneMaskCustom as any,
                    }}
                    // type="text"
                  />
                </Grid>

                <Grid>
                  <TextField
                    sx={{ width: "300px", margin: "1% 0%" }}
                    label="CPF"
                    InputProps={{
                      inputComponent: CpfMaskComponent as any,
                    }}
                    {...getControls(formRegisterUser, "cpf")}
                    type="text"
                  />
                </Grid>

                <Grid>
                  <TextField
                    sx={{ width: "300px", margin: "1% 0%" }}
                    label="Email"
                    {...getControls(formRegisterUser, "email")}
                    type="email"
                  />
                </Grid>

                <Grid sx={{ position: "relative" }}>
                  <TextField
                    sx={{ width: "300px", margin: "1% 0%" }}
                    label="Senha"
                    type={show ? "text" : "password"}
                    {...getControls(formRegisterUser, "password")}
                  />
                  <div className="showPassword-Register">
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

                <Grid sx={{ position: "relative" }}>
                  <TextField
                    sx={{ width: "300px", margin: "1% 0%" }}
                    label="Confirmar senha"
                    type={showConfirmPw ? "text" : "password"}
                    {...getControls(formRegisterUser, "passwordConfirm")}
                  />
                  <div className="showPassword-Register">
                    {showConfirmPw ? (
                      <abbr title="Ocultar senha">
                        <VisibilityIcon
                          onClick={handleClickConfirmPw}
                          style={{ color: "var(--cor003)" }}
                        />
                      </abbr>
                    ) : (
                      <abbr title="Exibir senha">
                        <VisibilityOffIcon
                          style={{ color: "var(--cor033)" }}
                          onClick={handleClickConfirmPw}
                        />
                      </abbr>
                    )}
                  </div>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: -4,
                  }}
                >
                  <Button
                    type="submit"
                    className="register_submit"
                    variant="contained"
                    id="btnRegistrar"
                  >
                    Cadastrar-se
                  </Button>
                </Grid>
                <Grid sx={{ textAlign: "center", margin: "5% 0%" }}>
                  <span>
                    Já possui Cadastro ? <a href="sign-in">Entrar</a>
                  </span>
                </Grid>
              </Box>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RegisterPage;
