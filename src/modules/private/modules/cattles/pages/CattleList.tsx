import React, { ReactElement, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
  nlNL,
  ptBR,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ImEye } from "react-icons/im";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { FaSkullCrossbones } from "react-icons/fa";
import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { CattleModel, CATTLE_SEXS, CATTLE_TYPES } from "../models/CattleModel";
import { CattleHelper } from "../helpers/CattleHelper";
import "../../../styles/CattleList.css";
import { FarmModel } from "modules/private/models/FarmModel";
import { Timestamp } from "firebase/firestore";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import toast from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
// import { ptBR } from "@mui/material/locale";

import { bgcolor } from "@mui/system";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CattleListPage = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    {
      field: "identifier",
      headerName: "Identificador",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    // {
    //   field: "category",
    //   headerName: "Categoria",
    //   headerAlign: "center",
    //   align: "center",
    //   type: "number",
    //   width: 100,
    //   valueGetter: (params: GridValueGetterParams) => `${params.row.weigth} kg`,
    // },
    {
      field: "sex",
      headerName: "Sexo",
      sortable: false,
      width: 110,
      headerAlign: "center",
      align: "center",
      valueGetter: (params: GridValueGetterParams) => getSex(params.row.sex),
    },
    {
      field: "name",
      headerName: "Nome",
      width: 145,
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "age",
      headerName: "Idade",
      headerAlign: "center",
      align: "center",
      width: 110,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.age}(a) e ${params.row.month}(m)`,
    },
    {
      field: "type",
      headerName: "Tipo",
      sortable: false,
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "weigth",
      headerName: "Peso",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 90,
      valueGetter: (params: GridValueGetterParams) => `${params.row.weigth} kg`,
    },
    {
      field: "qtyChildren",
      headerName: "Qtd de Cria",
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: false,
      // valueGetter: (params: GridValueGetterParams) =>
      //     `${params.row.qtyChildren} kkk`,
    },
    {
      field: "operacoes",
      headerName: "Operações",
      description:
        "Nos botões abaixo você pode visualizar os dados do animal,visualizar o cartão de vacina, editar e deletar os dados do animal selecionado.",
      sortable: false,
      headerAlign: "center",
      width: 260,
      renderCell: (params: GridRenderCellParams) => {
        const currentAnimalRow = params.row as CattleModel;

        return (
          <>
            <Link to={`/private/cattle/${currentAnimalRow.id}/infoGado`}>
              <Fab
                size="small"
                style={{ color: "green" }}
                id="btn-ViewAnimalData"
              >
                <abbr title="Visualizar dados do Animal">
                  <ImEye size={20} style={{ color: "white" }} />
                </abbr>
              </Fab>
            </Link>

            <Link to={`/private/cattle/${currentAnimalRow.id}/Vaccine`}>
              <Fab size="small" color="primary" id="btn-ViewVaccine">
                <abbr title="Cartão de Vacina">
                  <VaccinesIcon />
                </abbr>
              </Fab>
            </Link>

            <Link to={`/private/cattles/form/${currentAnimalRow.id}`}>
              <Fab
                size="small"
                style={{ color: "green" }}
                id="btn-EditAnimalData"
              >
                <abbr title="Editar Dados do Animal">
                  <EditIcon style={{ color: "white" }} />
                </abbr>
              </Fab>
            </Link>

            <Fab
              id="btn-DeleteAnimal"
              size="small"
              color="error"
              onClick={() => openDeleteAnimalModal(currentAnimalRow)}
            >
              <abbr title="Deletar">
                <DeleteIcon />
              </abbr>
            </Fab>
            <Fab
              id="btn-AnimalDeath"
              size="small"
              style={{ backgroundColor: "black", marginLeft: 7 }}
              onClick={handleOpen}
            >
              <abbr title="Morte do Animal">
                <FaSkullCrossbones
                  size={18}
                  style={{ color: "white", marginTop: 4 }}
                />
              </abbr>
            </Fab>
          </>
        );
      },
    },
  ];

  const [selectedAnimal, setSelectedAnimal] = useState<CattleModel>();
  const [animals, setAnimals] = useState<CattleModel[]>([]);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const cattlehelpers = CattleHelper();
  const loadingHelper = useGlobalLoading();
  const getSex = (sex: number): string => {
    return CATTLE_SEXS[sex];
  };

  const getMonthFromDate = (date: string) => {
    var birthDay = new Date(date);
    var today = new Date();
    var birthDayYear = birthDay.getFullYear();
    var todayYear = today.getFullYear();
    var birthDayMonth = birthDay.getMonth();
    var todayMonth = today.getMonth();
    return todayMonth + 12 * todayYear - (birthDayMonth + 12 * birthDayYear);
    var birthDay = new Date(date);
    var today = new Date();
  };

  const getAgeFromDate = (date: string) => {
    var today = new Date();
    var birthDate = new Date(date);
    console.log(today.getMonth());
    return Math.floor(
      Math.ceil(
        Math.abs(birthDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
      ) / 365.25
    );
  };

  useEffect(() => {
    loadingHelper.startLoading();
    cattlehelpers
      .getAllCattles()
      .then((cattles) => {
        const listToDisplay: any[] = [];
        for (let index = 0; index < cattles.length; index++) {
          const cattle = cattles[index];

          const cattleToDisplay = {
            id: cattle.id,
            identifier: cattle.identifier,
            name: cattle.name,
            // Exemplo 3 de como mudar o valor para exibir
            age: getAgeFromDate(cattle.birthday),
            month: getMonthFromDate(cattle.birthday),
            // Exemplo 4 de como mudar o valor para exibir
            type: CATTLE_TYPES[cattle.type],
            sex: cattle.sex,
            weigth: cattle.weigth,
            qtyChildren: cattle.qtyChildren,
          };

          listToDisplay.push(cattleToDisplay);
        }
        setAnimals(listToDisplay);
        loadingHelper.stopLoading();
      })
      .catch((err: any) => {
        toast.error(err);
        loadingHelper.stopLoading();
      });
  }, []);

  const openDeleteAnimalModal = (animalSelected: CattleModel) => {
    setSelectedAnimal(animalSelected);
    setModalDeleteOpen(true);
  };
  const HandleDeleteAnimal = async (isToDelete: boolean) => {
    if (isToDelete && selectedAnimal && selectedAnimal.id) {
      await cattlehelpers.deleteCattleId(selectedAnimal.id);
      toast.success(`Animal ${selectedAnimal.name} deletado com sucesso`);
      await cattlehelpers.getAllCattles().then(setAnimals);
    } else {
    }

    // setSelectedAnimal({});
    // Fecha o modal
    setModalDeleteOpen(false);
  };

  const renderDeleteAnimalModal = () => {
    if (selectedAnimal) {
      return (
        <Modal
          hideBackdrop
          open={modalDeleteOpen}
          onClose={() => HandleDeleteAnimal(false)}
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
                  Você realmente deseja excluir esse animal ({" "}
                  {selectedAnimal.name} )?
                </span>
              </Grid>
              <Grid
                sx={{
                  margin: "2%  15% 2% 2%",
                  display: "flex",
                }}
              >
                <p>
                  Após a exclusão não será possível recuperar os dados do animal
                  ( {selectedAnimal.name} )
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
                    onClick={() => HandleDeleteAnimal(true)}
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
                    onClick={() => HandleDeleteAnimal(false)}
                  >
                    Não
                  </Button>{" "}
                </Grid>
              </Grid>
            </div>
          </Box>
        </Modal>
      );
    }
  };

  /**
   * Modal de excluçao do botao de fora da tabela
   */
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleCloseDelete = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
          <div id="bloco-modal-AnimalDeath">
            <Grid sx={{ margin: "2%  2%" }}>
              <span style={{ fontWeight: "bold" }}>
                Selecione abaixo o motivo da morte do animal
              </span>
            </Grid>
            <Grid
              sx={{
                margin: "2%  15% 2% 2%",
              }}
            >
              {/* <Checkbox {...label} />
              <span style={{ color: "var(--cor004", fontSize: 18 }}>
                Causas Diversas
              </span>
              <br />
              <Checkbox {...label} />
              <span style={{ color: "var(--cor004", fontSize: 18 }}>
                Consumo Próprio
              </span> */}
              <Select fullWidth={true} label="Grouping" name="type">
                <MenuItem value={1}>Causas Diversa</MenuItem>
                <MenuItem value={2}>Consumo Próprio</MenuItem>
              </Select>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Grid
                sx={{
                  margin: " 3% 6%",
                  borderRadius: "10px",
                }}
              >
                <Button>Salvar</Button>{" "}
              </Grid>
              <Grid
                sx={{
                  margin: " 3% -5%",
                  borderRadius: "10px",
                }}
              >
                <Button onClick={handleClose}>cancelar</Button>{" "}
              </Grid>
            </Grid>
          </div>
        </Box>
      </Modal>
      {/* <div>
        <Modal open={open} onClose={handleCloseDelete}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 510,
              height: 240,
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: 11,
              p: 4,
            }}
          >
            <div id="bloco-modal">
              <Grid sx={{ margin: "2%  2%" }}>
                <span>Você realmente deseja excluir esses animais?</span>
              </Grid>
              <Grid
                sx={{
                  margin: "2%  15% 2% 2%",
                  display: "flex",
                }}
              >
                <p>
                  Após a exclusão não será possível recuperar os dados dos
                  animais!
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
                    onClick={() => handleCloseDelete()}
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
                    onClick={() => handleCloseDelete()}
                  >
                    Não
                  </Button>{" "}
                </Grid>
              </Grid>
            </div>
          </Box>
        </Modal>
      </div> */}

      <div className="MainBlock">
        <div id="Block-Txt-Line-List">
          <h2 id="Block-Txt-List">Minha Criação</h2>
          <span id="Block-Line-List">
            <abbr title="Adicionar Animal">
              <Fab id="AddIcon" component={Link} to="/private/cattles/form">
                <AddIcon />
              </Fab>
            </abbr>
            {/* BOTAO DELETAR AQ */}
            <abbr title="Deletar Animal">
              <Fab id="AddIcon">
                <DeleteIcon />
              </Fab>
            </abbr>
            {/* FIM DO BOTAO DELETAR */}
          </span>
        </div>
        <Box id="table-MinhaCriacao">
          <div style={{ height: 420, width: 1060 }}>
            <DataGrid
              getRowId={(e: any) => e.id}
              rows={animals}
              columns={columns}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              checkboxSelection
              sx={{
                border: "none",
                boxShadow: " 2px 2px 4px 2px var(--cor111)",
              }}
            />
            {renderDeleteAnimalModal()}
          </div>
        </Box>
      </div>
    </>
  );
};
export default CattleListPage;
