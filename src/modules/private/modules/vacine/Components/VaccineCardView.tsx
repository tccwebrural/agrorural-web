import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Modal,
  Box,
  Grid,
  Button,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { VacineModel } from "../models/VacineModel";
import { VacineHelper } from "../helpers/VacineHelpers";
import toast from "react-hot-toast";

import "../../../styles/MyCattle.css";
import VaccineModalDelete from "./VaccineInfoVIew";
import { useNotification } from "providers/NotificationProvider";

const VaccineCardView = (): ReactElement => {
  const { id } = useParams();

  const [vacines, setVacines] = useState<VacineModel[]>([]);
  const vacineHelper = VacineHelper();
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [selectedVacine, setSelectedVacine] = useState<VacineModel>();
  const notifyProvider = useNotification();

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

      await vacineHelper.getAllVacines(id).then(setVacines);
      toast.success(`Vacina ${selectedVacine.name} deletada com sucesso`);

      await notifyProvider.refreshNotifications();
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
            open={modalDeleteOpen}
            onClose={() => HandleDeleteVacine(false)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                height: 250,
                bgcolor: "white",
                borderRadius: "10px",
                boxShadow: 11,
                p: 4,
              }}
            >
              <div id="bloco-modal">
                <Grid sx={{ margin: "2%  2%" }}>
                  <span>
                    Você realmente deseja excluir esse vacina "{" "}
                    {selectedVacine.name}"?
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
                    vacina "{selectedVacine.name}"
                  </p>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Grid
                    sx={{
                      margin: " 2% 1%",
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
                      margin: " 2% 1%",
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
      {vacines.map((vacine, index) => (
        <Card key={index} id="CardView">
          <div id="vaccineIcons">
            <VaccinesIcon
              style={{
                color: "var(--cor008)",
                height: 50,
                width: 50,
                margin: "auto",
              }}
            />
          </div>

          <CardContent id="CardName">
            <h3> {vacine.name}</h3>
          </CardContent>

          <CardActions id="CardIcon" disableSpacing>
            <IconButton
              onClick={() => openDeleteVacineModal(vacine)}
              aria-label="add to favorites"
              style={{
                backgroundColor: "var(--cor009)",
                width: 30,
                height: 30,
              }}
            >
              <abbr title="Deletar vacina">
                <DeleteIcon
                  style={{
                    color: "var(--cor001)",
                    width: 20,
                    height: 20,
                    marginTop: 5.5,
                  }}
                />
              </abbr>
            </IconButton>

            <IconButton
              aria-label="share"
              component={Link}
              to={`/private/cattle/${id}/vacine/${vacine.id}/edit`}
              style={{
                backgroundColor: "var(--cor007)",
                width: 30,
                height: 30,
                margin: 2,
              }}
            >
              <abbr title="Editar vacina">
                <EditIcon
                  style={{ color: "var(--cor001)", width: 20, height: 20 }}
                />
              </abbr>
            </IconButton>

            <IconButton
              aria-label="share"
              component={Link}
              to={`/private/cattle/${id}/vaccine/${vacine.id}/view`}
              style={{
                backgroundColor: "var(--cor006)",
                width: 30,
                height: 30,
              }}
            >
              <abbr title="Visualizar dados da vacina">
                <VisibilityIcon
                  style={{
                    color: "var(--cor001)",
                    width: 20,
                    height: 20,
                    marginTop: 8,
                  }}
                />
              </abbr>
            </IconButton>
          </CardActions>
        </Card>
      ))}
      {renderDeleteVacineModal()}
    </>
  );
};

export default VaccineCardView;
