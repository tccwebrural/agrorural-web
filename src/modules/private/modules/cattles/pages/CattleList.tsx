import React, { ReactElement, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ImEye } from "react-icons/im";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { Box, Button, Fab, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { CattleModel } from "../models/CattleModel";
import { CattleHelper } from "../helpers/CattleHelper";
import "../../../styles/CattleList.css";
import { FarmModel } from "modules/private/models/FarmModel";
import { Timestamp } from "firebase/firestore";
const CattleListPage = (): ReactElement => {
  const columns: GridColDef[] = [
    {
      field: "identifier",
      headerName: "Identificador",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "sex",
      headerName: "Categoria",
      sortable: false,
      width: 110,
      headerAlign: "center",
      align: "center",
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
      field: "birthday",
      headerName: "Idade",
      headerAlign: "center",
      align: "center",
      width: 110,
      sortable: false,
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
    },
    {
      field: "qtyChildren",
      headerName: "Qtd de Cria",
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: false,
    },
    {
      field: "operacoes",
      headerName: "Operações",
      description:
        "Nos botões abaixo você pode visualizar os dados do animal,visualizar o cartão de vacina, editar e deletar os dados do animal selecionado.",
      sortable: false,
      headerAlign: "center",
      width: 210,
      renderCell: (params: GridRenderCellParams) => {
        const currentAnimalRow = params.row as CattleModel;

        return (
          <>
            <Link to={`/private/cattle/Vaccine`}>
              <Fab
                size="small"
                style={{ color: "green" }}
                id="btn-ViewAnimalData"
              >
                <abbr title="Editar Dados do Animal">
                  <ImEye size={20} style={{ color: "white" }} />
                </abbr>
              </Fab>
            </Link>

            <Link to={`/private/cattle/vaccine/view`}>
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
          </>
        );
      },
    },
  ];
  const [selectedAnimal, setSelectedAnimal] = useState<CattleModel>();
  const [animals, setAnimals] = useState<CattleModel[]>([]);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const cattlehelpers = CattleHelper();

  useEffect(() => {
    cattlehelpers.getAllCattles().then((animals) => setAnimals(animals));
  }, []);

  //
  // useEffect(() => {
  //   cattlehelpers.getAllCattles().then((animals: CattleModel[]) => {
  //     const animalDate = [];
  //     for (let i = 0; i < animals.length; i++) {
  //       const animal = animals.at(i);

  //       // if (animal?.birthday) {
  //       //   return (
  //       //     animal.birthday.toDate().getTime() -
  //       //     Timestamp.now().toDate().getTime()
  //       //   );
  //       // }
  //       const animalToShow = {
  //         birthday: animal?.birthday?.toDate().getTime(),
  //         DateNow: Timestamp.now().toDate().getTime(),
  //       };
  //       if (animalToShow.birthday) {
  //         return animalToShow.DateNow - animalToShow.birthday;
  //       }
  //       animalDate.push(animalToShow);
  //     }

  //     setAnimals(animalDate);
  //   });
  // }, []);

  const getAnimalAge = (animals: CattleModel) => {
    // const animalAge = animals.birthday?.toDate().getTime();
    // const actualDay = Timestamp.now().toDate().getTime();
    // const getActualAnimalAge = animalAge? - actualDay
    // return getActualAnimalAge;
    // if (animal?.birthday) {
    //   return (
    //     animal.birthday.toDate().getTime() - Timestamp.now().toDate().getTime()
    //   );
    // }
  };

  const openDeleteAnimalModal = (animalSelected: CattleModel) => {
    setSelectedAnimal(animalSelected);
    setModalDeleteOpen(true);
  };
  const HandleDeleteAnimal = async (isToDelete: boolean) => {
    if (isToDelete && selectedAnimal && selectedAnimal.id) {
      await cattlehelpers.deleteCattleId(selectedAnimal.id);
      await cattlehelpers.getAllCattles().then(setAnimals);
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
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box>
            <h2>
              Você realmente deseja excluir esse animal ( {selectedAnimal.name}{" "}
              )?
            </h2>
            <p>
              Após a exclusão não será possível recuperar os dados do animal ({" "}
              {selectedAnimal.name} )
            </p>
            <Button onClick={() => HandleDeleteAnimal(false)}>Não</Button>
            <Button onClick={() => HandleDeleteAnimal(true)}>Sim</Button>
          </Box>
        </Modal>
      );
    }
  };

  // return (
  //   <Box
  //     sx={{
  //       flexGrow: 1,
  //       backgroundColor: "whitesmoke",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <Typography variant="h3">CattleList</Typography>
  //   </Box>
  // );
  return (
    <>
      <div className="MainBlock">
        <div id="Block-Txt-Line-List">
          <h2 id="Block-Txt-List">Minha Criação</h2>
          <span id="Block-Line-List">
            <abbr title="Adicionar Animal">
              <Fab id="AddIcon" component={Link} to="/private/cattles/form">
                <AddIcon />
              </Fab>
            </abbr>
          </span>
        </div>

        <Box id="table-MinhaCriacao">
          <div style={{ height: 420, width: 1025 }}>
            <DataGrid
              getRowId={(e: any) => e.id}
              rows={animals}
              columns={columns}
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
