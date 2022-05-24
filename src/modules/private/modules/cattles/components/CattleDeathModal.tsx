import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import { CattleHelper } from "../helpers/CattleHelper";
import { CattleDeathModel, CattleModel } from "../models/CattleModel";

const CattleDeathModalComponent = (): ReactElement => {
  const [cattleDeath, setCattleDeath] = useState<CattleDeathModel>({
    deathBy: "",
  });

  const [selectedAnimal, setSelectedAnimal] = useState<CattleModel>();
  const [modalDeathOpen, setModalDeathOpen] = useState(false);
  const [animals, setAnimals] = useState<CattleModel[]>([]);
  const cattlehelpers = CattleHelper();

  const handleDeathAnimal = async (isToDelete: boolean) => {
    if (isToDelete && selectedAnimal && selectedAnimal.id) {
      toast.success(`Animal ${selectedAnimal.name} atualizado com sucesso`);
      await cattlehelpers.getAllCattles().then(setAnimals);
    } else {
      setModalDeathOpen(false);
    }

    // setSelectedAnimal({});
    // Fecha o modal
    setModalDeathOpen(false);
  };

  const openDeathAnimalModal = (animalSelected: CattleModel) => {
    setSelectedAnimal(animalSelected);
    setModalDeathOpen(true);
  };
  const renderDeatTypesModal = () => {
    if (selectedAnimal) {
      return (
        <Modal open={modalDeathOpen} onClose={() => handleDeathAnimal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 530,
              height: "auto",
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: 11,
              p: 4,
            }}
          >
            <div id="bloco-modal-AnimalDeath">
              <Grid sx={{ margin: "2%  2%" }}>
                <span style={{ fontWeight: "bold" }}>
                  Selecione abaixo o motivo da morte do animal
                </span>
              </Grid>
              <Grid sx={{ margin: "3%" }}>
                <Select fullWidth={true} name="deathBy" value="deathBy">
                  <MenuItem value={1}>Causas Diversas</MenuItem>
                  <MenuItem value={2}>Consumo Próprio</MenuItem>
                </Select>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Grid sx={{ margin: "0% 1%" }}>
                  <Button
                    id="btn-modalSalvarDeath"
                    onClick={() => handleDeathAnimal(true)}
                  >
                    Salvar
                  </Button>{" "}
                </Grid>

                <Grid sx={{ margin: "0% 1%" }}>
                  <Button
                    id="btn-modalCancelarDeath"
                    onClick={() => handleDeathAnimal(false)}
                  >
                    cancelar
                  </Button>{" "}
                </Grid>
              </Box>
            </div>
          </Box>
        </Modal>
      );
    }
  };
  return <>{renderDeatTypesModal}</>;
};

export default CattleDeathModalComponent;
