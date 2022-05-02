import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUserModel } from "../../../models/UserModel";
import { useAuth } from "../../../../../providers/AuthProvider";
import { getControls } from "../../../../../utils/FormUtils";
import { RegisterValidatorSchema } from "../validators/RegisterValidatorSchema";
import footer from "../../../../../assets/footer.png";
import vaca2 from "../../../../../assets/vaca2.png";
import vaca3 from "../../../../../assets/vaca3.png";
import logoPequena from "../../../../../assets/logoPequena.png";
import "../../../styles/Register.css";
import { Toaster } from "react-hot-toast";
import { trackPromise } from "react-promise-tracker";
import { GLOBAL_LOADING_KEY } from "../../../../../constants";
import { IMaskInput } from "react-imask";
import Input from "@mui/material/Input";
import { PhoneMaskCustom } from "modules/public/components/PhoneMaskComponent";

// import { InputMask } from "react-input-mask";

//MODEL PARA NUMERO
// interface CustomProps {
//   onChange: (event: { target: { name: string; value: string } }) => void;
//   name: string;
// }
// // COMPONENTE A PARTE
// const PhoneMaskCustom = React.forwardRef<HTMLElement, PhoneModel>(
//   function TextMaskCustom(props, ref) {
//     const { onChange, ...other } = props;
//     return (
//       <IMaskInput
//         {...other}
//         mask="(00) 00000-0000"
//         definitions={{
//           "#": /[1-9]/,
//         }}
//         onAccept={(value: any) =>
//           onChange({ target: { name: props.name, value } })
//         }
//         overwrite
//       />
//     );
//   }
// );

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

  return (
    <>
      <div id="imgFooter">
        <img src={footer} alt="Erro..." />
      </div>
      <div id="imgVaca1">
        <img src={vaca2} alt="Erro..." />
      </div>
      <div id="imgVaca2">
        <img src={vaca3} alt="Erro..." />
      </div>

      <Container>
        <section>
          <div id="login">
            <div id="logoPequena">
              <img src={logoPequena} alt="Erro..." />
            </div>
            <div id="form">
              <form
                className="register_container"
                onSubmit={formRegisterUser.handleSubmit}
              >
                <Box>
                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "2% 0%" }}
                      label="Proprietário da fazenda"
                      {...getControls(formRegisterUser, "name")}
                      type="text"
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "2% 0%" }}
                      label="Nome da fazenda"
                      {...getControls(formRegisterUser, "farmName")}
                      type="text"
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "2% 0%" }}
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
                      sx={{ width: "300px", margin: "2% 0%" }}
                      label="CPF"
                      {...getControls(formRegisterUser, "cpf")}
                      type="text"
                    />
                  </Grid>

                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "2% 0%" }}
                      label="Email"
                      {...getControls(formRegisterUser, "email")}
                      type="email"
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "2% 0%" }}
                      label="Senha"
                      type="password"
                      {...getControls(formRegisterUser, "password")}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      sx={{ width: "300px", margin: "2% 0%" }}
                      label="Confirmar senha"
                      type="password"
                      {...getControls(formRegisterUser, "passwordConfirm")}
                    />
                  </Grid>
                  <Grid>
                    <Button
                      sx={{ width: "300px", margin: "2% 0%" }}
                      type="submit"
                      className="register_submit"
                      variant="contained"
                    >
                      Cadastrar-se
                    </Button>
                  </Grid>
                  <Grid sx={{ textAlign: "center", margin: " 2% 0%" }}>
                    <span>
                      Já possui Cadastro ? <a href="sign-in">Entrar</a>
                    </span>
                  </Grid>
                </Box>
              </form>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default RegisterPage;
