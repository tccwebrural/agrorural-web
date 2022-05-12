import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Modal,
  Box,
  Grid,
  Button,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

import { alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";

import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CattleModel } from "../../cattles/models/CattleModel";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";

import VisibilityIcon from "@mui/icons-material/Visibility";
import "../../../styles/MyCattle.css";
import { VacineModel } from "../models/VacineModel";
import { VacineHelper } from "../helpers/VacineHelpers";
import VaccineModalDelete from "../../cattles/components/VaccineModalDelete";
import toast from "react-hot-toast";

const VaccineCardInfoCattle = (): ReactElement => {
  const { id } = useParams();

  const [vacines, setVacines] = useState<VacineModel[]>([]);
  const vacineHelper = VacineHelper();
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [selectedVacine, setSelectedVacine] = useState<VacineModel>();
  useEffect(() => {
    if (id) {
      vacineHelper.getAllVacines(id).then(setVacines);
    }
  }, []);

  const openDeleteVacineModal = (vacineSelected: VacineModel) => {
    setSelectedVacine(vacineSelected);
    setModalDeleteOpen(true);
  };

  const HandleDeleteVacine = async (isToDelete: boolean) => {
    if (isToDelete && selectedVacine && selectedVacine.id && id) {
      await vacineHelper.deleteVacineId(selectedVacine.id, id);
      toast.success(`Vacina ${selectedVacine.name} deletada com sucesso`);
      await vacineHelper.getAllVacines(id).then(setVacines);
    } else {
      // toast.error("Erro ao deletar a vacina");
    }
    setModalDeleteOpen(false);
  };

  const renderDeleteVacineModal = () => {
    if (selectedVacine) {
      return (
        <>
          <Modal
            hideBackdrop
            open={modalDeleteOpen}
            onClose={() => HandleDeleteVacine(false)}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 560,
              height: 250,
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: 11,
              p: 4,
            }}
          >
            <Box>
              <div id="bloco-modal">
                <Grid sx={{ margin: "2%  2%" }}>
                  <span>
                    Você realmente deseja excluir esse vacina ({" "}
                    {selectedVacine.name} )?
                  </span>
                </Grid>
                <Grid
                  sx={{
                    margin: "2%  15% 2% 2%",
                    display: "flex",
                  }}
                >
                  <p>
                    Após a exclusão não será possível recuperar os dados da
                    vacina ( {selectedVacine.name} )
                  </p>
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
                      onClick={() => HandleDeleteVacine(true)}
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
                      onClick={() => HandleDeleteVacine(false)}
                    >
                      Não
                    </Button>{" "}
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Modal>
        </>
      );
    }
  };
  return (
    <>
      {vacines.map((vacine) => (
        // <h1></h1>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor: red[500],
                  alignContent: "center",
                  justifyContent: "center",
                }}
                aria-label="recipe"
              >
                <VaccinesIcon />
              </Avatar>
            }
          />

          <CardContent>
            <h3> {vacine.name}</h3>
          </CardContent>

          {/* <CardActions disableSpacing></CardActions> */}
        </Card>
      ))}
      {renderDeleteVacineModal()}
    </>
  );
};

export default VaccineCardInfoCattle;
