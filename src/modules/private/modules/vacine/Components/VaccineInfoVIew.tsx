import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Modal,
  Box,
  Grid,
  Button,
} from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import { red } from "@mui/material/colors";

import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VacineModel } from "../models/VacineModel";
import { VacineHelper } from "../helpers/VacineHelpers";
import toast from "react-hot-toast";

import "../../../styles/MyCattle.css";

const VaccineInfoView = (): ReactElement => {
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

  const handleDeleteVacine = async (isToDelete: boolean) => {
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
            onClose={() => handleDeleteVacine(false)}
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
                      onClick={() => handleDeleteVacine(true)}
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
                      onClick={() => handleDeleteVacine(false)}
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
        <Card id="Card">
          <div id="vaccineIcons-InfoGado">
            <VaccinesIcon
              style={{
                color: "var(--cor008)",
                height: 50,
                width: 50,
                margin: "auto",
              }}
            />
          </div>
          <CardContent id="cardNameInfoGado">
            <h3>{vacine.name}</h3>
          </CardContent>
        </Card>
      ))}
      {renderDeleteVacineModal()}
    </>
  );
};

export default VaccineInfoView;
