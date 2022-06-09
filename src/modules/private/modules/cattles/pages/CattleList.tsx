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
import { FaCross } from "react-icons/fa";
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
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import toast from "react-hot-toast";

import "../../../styles/CattleList.css";
import { Formik } from "formik";
import { CattleValidatorSchema } from "../validators/CattleValidatorSchema";
import { getControls } from "utils/FormUtils";
import { CattleDeathValidatorSchema } from "../validators/CattleDeathValidatorSchema";
import {
  DEATH_BY_VARIOUS_CASES,
  DEATH_BY_OWN_CONSUMPTION,
  CATTLE_IS_LIVE,
} from "../../../../../constants";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
// import { ptBR } from "@mui/material/locale";

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
              onClick={() => openDeathAnimalModal(currentAnimalRow)}
            >
              <abbr title="Morte do Animal">
                <FaCross size={18} style={{ color: "white", marginTop: 8 }} />
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
  const [modalDeathOpen, setModalDeathOpen] = useState(false);
  const [selectedDeathBy, setSelectedDeathBy] = useState<number>(0);

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
            status: cattle.status,
          };
          if (cattleToDisplay.status != 3) {
            listToDisplay.push(cattleToDisplay);
          }
        }

        setAnimals(listToDisplay);
        loadingHelper.stopLoading();
      })
      .catch((err: any) => {
        toast.error(err);
        loadingHelper.stopLoading();
      });
  }, []);

  //
  // BLOCO DE CODIGO MODAL DELETE ******************************************************************
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
        <Modal open={modalDeleteOpen} onClose={() => HandleDeleteAnimal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
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
                  Você realmente deseja excluir esse animal "
                  {selectedAnimal.name}"?
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
                  "{selectedAnimal.name}".
                </p>
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  margin: " 1%",
                  justifyContent: "flex-end",
                }}
              >
                <Grid
                  sx={{
                    margin: " 3% 1%",
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
                    margin: " 3% 1%",
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

  // FIM DO BLOCO DE CODIGO MODAL DELETE ****************************************************************

  // ***********************************BLOCO CODIGO MODAL DEATHS *********************************

  const openDeathAnimalModal = (animalSelected: CattleModel) => {
    setSelectedAnimal(animalSelected);
    setModalDeathOpen(true);
  };

  const handleDeathAnimal = async () => {
    try {
      if (selectedAnimal?.id) {
        await cattlehelpers.updateDeathTypes(
          selectedAnimal.id,
          selectedDeathBy
        );

        toast.success(
          `Animal ${selectedAnimal.name} foi morto por ${selectedDeathBy}`
        );
      } else {
        throw "Animal não selecionado";
      }
    } catch (err: any) {
      console.error(err);
      toast.error(`Ocorreu um erro ao realizar a atualização do gado`);
    }

    // Fecha o modal
    setModalDeathOpen(false);
  };

  const renderDeatTypesModal = () => {
    if (selectedAnimal) {
      return (
        <Modal open={modalDeathOpen} onClose={() => setModalDeathOpen(false)}>
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
            <Grid sx={{ margin: "2%  2%" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "var(--cor005)",
                  marginLeft: 10,
                }}
              >
                Selecione abaixo o motivo da morte do animal
              </span>
            </Grid>
            <Grid sx={{ margin: "3%" }}>
              <Select
                fullWidth={true}
                value={selectedDeathBy}
                onChange={(event) => {
                  const selectedValue = event.target.value as number;
                  setSelectedDeathBy(selectedValue);
                }}
              >
                <MenuItem value={DEATH_BY_VARIOUS_CASES}>
                  Causas Diversas
                </MenuItem>
                <MenuItem value={DEATH_BY_OWN_CONSUMPTION}>
                  Consumo Próprio
                </MenuItem>
              </Select>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid sx={{ margin: "0% 1%" }}>
                <Button
                  id="btn-modalSalvarDeath"
                  type="submit"
                  onClick={() => handleDeathAnimal()}
                >
                  Salvar
                </Button>
              </Grid>

              <Grid sx={{ margin: "0% 1%" }}>
                <Button
                  id="btn-modalCancelarDeath"
                  onClick={() => setModalDeathOpen(false)}
                >
                  Cancelar
                </Button>
              </Grid>
            </Box>
          </Box>
        </Modal>
      );
    }
  };

  // *************************************** FIM DO CODIGO MODAL DEATHS ****************************************
  return (
    <>
      {/* MODALL KK */}
      <div id="MainBlockCattleList">
        <div id="Block-Txt-Line-List">
          <h2 id="Block-Txt-List">Minha Criação</h2>
          <span id="Block-Line-List">
            <div id="iconsList">
              <abbr title="Adicionar Animal">
                <Fab id="AddIcon" component={Link} to="/private/cattles/form">
                  <AddIcon />
                </Fab>
              </abbr>
            </div>
          </span>
        </div>
        <Box id="table-MinhaCriacao">
          <div
            style={{
              height: 420,
              width: 1080,
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <DataGrid
              getRowId={(e: any) => e.id}
              rows={animals}
              columns={columns}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              // CAIXA DE SELELEÃO
              // checkboxSelection

              sx={{
                border: "none",
                boxShadow: " 2px 2px 4px 2px var(--cor111)",
              }}
              // sx={{
              //   boxShadow: 2,
              //   border: 2,
              //   borderColor: "primary.light",
              //   "& .MuiDataGrid-cell:hover": {
              //     color: "primary.main",
              //   },
              // }}
            />
            {renderDeleteAnimalModal()}
            {renderDeatTypesModal()}
          </div>
        </Box>
      </div>
    </>
  );
};
export default CattleListPage;
