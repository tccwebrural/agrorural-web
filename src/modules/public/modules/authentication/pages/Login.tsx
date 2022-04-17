import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoMd from "../../../../../assets/logo-md.svg";
import { useAuth } from "../../../../../providers/AuthProvider";
import { getControls } from "../../../../../utils/FormUtils";
import { LoginValidatorSchema } from "../validators/LoginValidatorSchema";
import "./Login.css";

const LoginPage = (): ReactElement => {
  const authContext = useAuth();
  const navigate = useNavigate();

  const formLoginUser = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidatorSchema,
    onSubmit: async (formValue) => {
      await authContext.signIn(formValue.email, formValue.password);
      navigate("/private");
    },
  });

  return (
    <div className="login">
      <img src={logoMd} />
      <form className="login__container" onSubmit={formLoginUser.handleSubmit}>
        <TextField
          type="email"
          label="E-mail"
          variant="outlined"
          {...getControls(formLoginUser, "email")}
        />
        <TextField
          type="Password"
          label="Senha"
          variant="outlined"
          {...getControls(formLoginUser, "password")}
        />
        <Button className="login__submit" variant="contained" type="submit">
          Login
        </Button>
        <p>
          <Link to="/reset">Esqueci minha senha</Link>
        </p>
        <p>
          Você ainda não tem conta? <Link to="/sign-up">Registre-se</Link>.
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
