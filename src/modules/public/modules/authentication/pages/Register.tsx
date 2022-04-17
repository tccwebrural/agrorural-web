import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUserModel } from "../../../../../models/UserModel";
import { useAuth } from "../../../../../providers/AuthProvider";
import { getControls } from "../../../../../utils/FormUtils";
import { RegisterValidatorSchema } from "../validators/RegisterValidatorSchema";
import "./Register.css";

const RegisterPage = (): ReactElement => {
  const navigate = useNavigate();

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
    validationSchema: RegisterValidatorSchema,
    onSubmit: async (formValue: RegisterUserModel) => {
      authContext.signUp(formValue).then(() => navigate("/private/home"));
    },
  });

  const authContext = useAuth();

  return (
    <div className="register">
      <form
        className="register_container"
        onSubmit={formRegisterUser.handleSubmit}
      >
        <TextField
          label="Proprietário da fazenda"
          {...getControls(formRegisterUser, "name")}
          type="text"
        />

        <TextField
          label="Nome da fazenda"
          {...getControls(formRegisterUser, "farmName")}
          type="text"
        />

        <TextField
          label="Telefone"
          {...getControls(formRegisterUser, "phone")}
          type="text"
        />

        <TextField
          label="CPF"
          {...getControls(formRegisterUser, "cpf")}
          type="text"
        />

        <TextField
          label="Email"
          {...getControls(formRegisterUser, "email")}
          type="email"
        />

        <TextField
          label="Senha"
          type="password"
          {...getControls(formRegisterUser, "password")}
        />
        <TextField
          label="Confirmar senha"
          type="password"
          {...getControls(formRegisterUser, "passwordConfirm")}
        />

        <Button type="submit" className="register_submit" variant="contained">
          Cadastrar-se
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
