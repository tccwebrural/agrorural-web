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
import {
  PerfilModelUser,
  RegisterUserModel,
  UserModel,
} from "modules/public/models/UserModel";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getFireError } from "utils/HandleFirebaseError";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { Formik } from "formik";
import { RegisterValidatorSchema } from "modules/public/modules/authentication/validators/RegisterValidatorSchema";
import { getControls } from "utils/FormUtils";
import { DocumentReference } from "firebase/firestore";
import { FarmHelper } from "modules/private/helpers/FarmHelper";

const ViewProfilePage = (): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const auth = useAuth();
  const { getFarmRef, getFarmValues } = FarmHelper();
  const farmRef = getFarmRef();
  const [initialValues, setInitialValues] = useState<PerfilModelUser>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
  });

  // const [initialValues, setInitialValues] = useState<UserModel>();
  const loadingHelper = useGlobalLoading();

  const navigate = useNavigate();
  const { id } = useParams();

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

  const [imgPreview] = useState(null);

  const initialState = { alt: "", src: "" };
  const [{ alt, src }, setPreview] = useState(initialState);

  const fileHandler = (e: any) => {
    const { files } = e.target;
    setPreview(
      files.length
        ? {
            src: URL.createObjectURL(files[0]),
            alt: files[0].name,
          }
        : initialState
    );
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
                <div className="imgPreview">
                  {!imgPreview && (
                    <>
                      <label htmlFor="fileUpload">
                        <img src={imgUser} id="imgProfile" />
                      </label>
                      <img className="preview" src={src} alt={alt} />
                      <input
                        id="fileUpload"
                        accept="image/*"
                        type="file"
                        onChange={fileHandler}
                      />
                    </>
                  )}
                </div>
              </div>
              <span id="BlockNameProfile">
                <input
                  id="nameProfile"
                  disabled={true}
                  defaultValue={initialValues.name}
                />
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
                      size="small"
                      variant="standard"
                      className="txt-FieldsProfile"
                      disabled={true}
                      {...getControls(formik, "cpf")}
                    />
                    <TextField
                      label="E-mail"
                      variant="standard"
                      className="txt-FieldsProfile"
                      {...getControls(formik, "email")}
                      disabled={true}
                    />
                    <TextField
                      label="Telefone"
                      size="small"
                      variant="standard"
                      className="txt-FieldsProfile"
                      {...getControls(formik, "phone")}
                      disabled={true}
                    />
                    <TextField
                      label="Nome da Fazenda"
                      variant="standard"
                      className="txt-FieldsProfile"
                      disabled={true}
                      {...getControls(formik, "farmName ")}
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
