import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import imgUser from "../../../../../assets/imgUser.png";
import rodape from "../../../../../assets/rodape.png";
import { BiMenu } from "react-icons/bi";
import "../../../styles/ViewProfile.css";
import { auth } from "configs/Firebase";
import { ProviderAuth, useAuth } from "providers/AuthProvider";
import { RegisterUserModel, UserModel } from "modules/public/models/UserModel";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getFireError } from "utils/HandleFirebaseError";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { Formik } from "formik";
import { RegisterValidatorSchema } from "modules/public/modules/authentication/validators/RegisterValidatorSchema";
import { getControls } from "utils/FormUtils";
import { DocumentReference } from "firebase/firestore";

const ViewProfilePage = (): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userName = "George Michael";
  const cpf = "000.000.002220.00";
  const email = "george@gmail.com";
  const tel = "(22) 99009900";
  const nameFarm = "Fazenda Olhos d`agua";

  const [initialValues, setInitialValues] = useState<RegisterUserModel>({
    name: "123",
    cpf: "",
    email: "",
    farmName: "",
    phone: "",
    password: "",
  });
  const [initialValues1, setInitialValues1] = useState({
    email: "",
  });

  // const [initialValues, setInitialValues] = useState<UserModel>();
  const loadingHelper = useGlobalLoading();
  const auth = useAuth();

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    auth.loadUserDataById("").then((user?: UserModel) => {
      if (user) {
        setInitialValues(initialValues);
      } else {
        //TODO: Volta para listagem
        toast.error("VACA NAO ENCONTRADA");
      }
      loadingHelper.stopLoading();
    });
  }, []);

  const submitForm = (user: RegisterUserModel) => {
    // user. = id;
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
        <div className="MainBlock">
          <div className="Block-Txt-Line">
            <h2 className="Block-Line">
              <span className="Block-Txt">Meu Perfil</span>
            </h2>
          </div>

          <div id="Profile">
            <div id="SmallBlock-Profile">
              <div>
                <abbr title="Menu">
                  <Button
                    id="menuProfile"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <BiMenu size={30} style={{ color: "var(--cor005)" }} />
                  </Button>
                </abbr>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Editar Perfil</MenuItem>
                  <MenuItem onClick={() => auth.logout()}>
                    Sair da conta
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Desativar conta</MenuItem>
                </Menu>
              </div>

              <div id="imgProfile">
                <fieldset id="img">
                  <abbr title="Adicionar foto de perfil">
                    <img id="imgUser" src={imgUser} />
                  </abbr>
                </fieldset>
              </div>

              <span id="BlockNameProfile">
                <input id="nameProfile" defaultValue={initialValues.name} />
              </span>

              <Formik
                enableReinitialize={true}
                onSubmit={submitForm}
                validationSchema={RegisterValidatorSchema}
                initialValues={initialValues}
              >
                {(formik) => (
                  <div id="FieldsProfile">
                    <TextField
                      label="CPF"
                      defaultValue={cpf}
                      size="small"
                      variant="standard"
                      className="txt-FieldsProfile"
                      {...getControls(formik, "cpf")}
                    />
                    <TextField
                      label="E-mail"
                      defaultValue={email}
                      variant="standard"
                      className="txt-FieldsProfile"
                    />
                    <TextField
                      label="Telefone"
                      defaultValue={tel}
                      size="small"
                      variant="standard"
                      className="txt-FieldsProfile"
                    />
                    <TextField
                      label="Nome da Fazenda"
                      defaultValue={nameFarm}
                      variant="standard"
                      className="txt-FieldsProfile"
                    />
                    <div></div>
                  </div>
                )}
              </Formik>
            </div>
          </div>
          <img id="imgFooter-Profile" src={rodape} />
        </div>
      </Box>
    </>
  );
};

export default ViewProfilePage;
