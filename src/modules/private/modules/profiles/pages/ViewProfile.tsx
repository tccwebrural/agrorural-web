import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Modal,
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
import { AltRouteRounded } from "@mui/icons-material";

import ModalEditarPerfil from "../components/ModalEditarPerfil";
import { updateProfile } from "firebase/auth";
import ButtonEditProfile from "../components/ButtonEditProfile";
import { EditProfileValidatorSchema } from "../validators/EditProfileValidatorSschema";

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
  const [initialValues, setInitialValues] = useState<PerfilModelUser>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    farmName: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  // const [initialValues, setInitialValues] = useState<UserModel>();
  const loadingHelper = useGlobalLoading();

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    auth.getUser().then(async (user?: UserModel) => {
      if (user) {
        const farmValues = await getFarmValues();
        farmValues?.name;

        if (farmValues) {
          user.farmName = farmValues?.name;
        }
        toast.success("Perfil carregado!");
        setInitialValues(user);
      } else {
        //TODO: Volta para listagem
        toast.error("Erro ao carregar  credenciais");
      }
      loadingHelper.stopLoading();
    });
  }, []);

  // ESCOPO PARA IMAGENS

  // FIM DO ESCOPO PARA IMAGENS

  const [show, setShow] = useState(false);

  console.log();

  console.log(auth.updateUserId(initialValues));
  const submitForm = async (user: PerfilModelUser) => {
    const userId = await auth.getUser();

    auth
      .updateUserId(user)
      .then(() =>
        //toast sucess
        {
          navigate("/private/cattles");
          // navigate(`private/cattle/${id}/Vaccine`);
        }
      )
      .catch((err: any) => {
        //TODO: Mensagem de erro
        //toast erro
        console.error(err);
        toast.error(getFireError(err));
      });

    // vacine.id = id;
  };
  console.log("SUBIT= " + submitForm);
  // const submitForm = () => {};
  /** modalDesativar */
  const [openModalDesativarPerfil, setOpenDesativar] = React.useState(false);
  const handleOpenModalDesativar = () => setOpenDesativar(true);
  const handleCloseDesativarPerfil = () => setOpenDesativar(false);

  /** Modal Editar */
  const [openModalEditarPerfil, setOpenEditar] = React.useState(false);
  const handleOpenModalEditar = () => setOpenEditar(true);
  const handleCloseEditarPerfil = () => setOpenEditar(false);

  const [imgPreview] = useState(null);

  const initialState = { alt: "", src: "" };
  const [{ alt, src }, setPreview] = useState(initialState);

  const handleOpenClickMenu = async () => {
    setIsDisabled(!isDisabled);

    await setShow(!show);
  };

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
      <div>
        <Modal
          open={openModalDesativarPerfil}
          onClose={handleCloseDesativarPerfil}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 530,
              height: 240,
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: 11,
              p: 4,
            }}
          >
            <div id="bloco-modal">
              <Grid sx={{ margin: "2%  2%" }}>
                <span>Você realmente deseja DESATIVAR sua conta?</span>
              </Grid>
              <Grid
                sx={{
                  margin: "2%  15% 2% 2%",
                  display: "flex",
                }}
              >
                <p>Sua conta será desativa até efetuar um novo Login</p>
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  margin: " 1%",
                  justifyContent: "center",
                }}
              >
                <Grid
                  sx={{
                    margin: " 6% 1%",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    id="btn-modalDelet"
                    // onClick={() => handleCloseDesativarPerfil()}
                    onClick={() => auth.desactiverUser()}
                  >
                    Sim
                  </Button>{" "}
                </Grid>
                <Grid
                  sx={{
                    margin: " 6% 1%",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    id="btn-modalCancel"
                    onClick={() => handleCloseDesativarPerfil()}
                  >
                    Não
                  </Button>{" "}
                </Grid>
              </Grid>
            </div>
          </Box>
        </Modal>
      </div>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div id="Block-Profile">
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
                  <MenuItem
                    // onClick={() => setShow((prev) => !prev)}
                    onClick={handleOpenClickMenu}
                  >
                    Editar Perfil
                  </MenuItem>
                  {/* COLAR COMPONENTE  BUTTONEDITPROFILE */}

                  <MenuItem onClick={() => auth.logout()}>
                    Sair da conta
                  </MenuItem>

                  <MenuItem onClick={handleOpenModalDesativar}>
                    Desativar conta
                  </MenuItem>
                </Menu>

                {/* COMPONENTE MENU */}

                {/* FIM DO COMPONENTE DO MENU */}
              </div>

              <div className="Block-imgPreview">
                {imgPreview ? (
                  <>
                    <label htmlFor="fileUpload">
                      <img className="imgProfile" src={src} alt={alt} />

                      {/* ESCOPO DA IMAGEM */}

                      {/* FIM DA IMAGEM */}
                    </label>
                    <input
                      id="fileUpload"
                      accept="image/*"
                      type="file"
                      onChange={fileHandler}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="fileUpload">
                      <img src={imgUser} className="imgProfile" />
                    </label>
                    <img id="input-imgProfile" src={src} alt={alt} />
                    <input
                      id="fileUpload"
                      accept="image/*"
                      type="file"
                      onChange={fileHandler}
                    />
                  </>
                )}
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
                validationSchema={EditProfileValidatorSchema}
                initialValues={initialValues}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div id="FieldsProfile">
                      <TextField
                        label="CPF"
                        size="small"
                        variant="standard"
                        className="txt-FieldsProfile"
                        disabled={isDisabled}
                        {...getControls(formik, "cpf")}
                      />
                      <TextField
                        label="E-mail"
                        variant="standard"
                        className="txt-FieldsProfile"
                        {...getControls(formik, "email")}
                        disabled={isDisabled}
                      />
                      <TextField
                        label="Telefone"
                        size="small"
                        variant="standard"
                        className="txt-FieldsProfile"
                        {...getControls(formik, "phone")}
                        disabled={isDisabled}
                      />
                      <TextField
                        label="Nome da Fazenda"
                        variant="standard"
                        className="txt-FieldsProfile"
                        {...getControls(formik, "farmName")}
                        disabled={isDisabled}
                      />

                      <div></div>
                    </div>
                    {/* {show && (
                      <Button variant="contained" color="success" type="submit">
                        Salvar
                      </Button>
                    )} */}
                    <Button
                      variant="contained"
                      color="success"
                      // onClick={salvarDadosAnimal}
                      type="submit"
                    >
                      Atualizar
                    </Button>
                  </form>
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
