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
import { ProviderAuth, updateUserId, useAuth } from "providers/AuthProvider";
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

const ButtonEditProfile = (): ReactElement => {
  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClickTextField = () => {
    setIsDisabled(!isDisabled);
    setShow(true);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModalDesativarPerfil, setOpenDesativar] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const auth = useAuth();
  const handleOpenModalDesativar = () => setOpenDesativar(true);
  const [imgPreview] = useState(null);
  const initialState = { alt: "", src: "" };

  const [{ alt, src }, setPreview] = useState(initialState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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

  return <></>;
};

export default ButtonEditProfile;
