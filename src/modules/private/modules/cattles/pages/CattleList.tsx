import React, { ReactElement } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ImEye } from "react-icons/im";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { Box, Fab } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "../../../styles/CattleList.css";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Identificador",
    headerAlign: "center",
    align: "center",
    width: 120,
  },
  {
    field: "category",
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
    field: "weight",
    headerName: "Peso",
    headerAlign: "center",
    align: "center",
    type: "number",
    width: 90,
  },
  {
    field: "qtyChildreen",
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
      return (
        <>
          <Fab
            size="small"
            // style={{ color: "purple" }}
            color="primary"
            id="btn-ViewAnimalData"
            component={Link}
            to="/private/cattle/view"
          >
            <abbr title="Visualizar Dados do Animal">
              <ImEye size={20} />
            </abbr>
          </Fab>
          <Fab
            size="small"
            color="primary"
            id="btn-ViewVaccine"
            component={Link}
            to="/private/cattles/:id/vacine/form"
          >
            <abbr title="Cartão de Vacina">
              <VaccinesIcon />
            </abbr>
          </Fab>
          <Fab
            size="small"
            style={{ color: "green" }}
            id="btn-EditAnimalData"
            component={Link}
            to="/private/cattles/form/id"
          >
            <abbr title="Editar Dados do Animal">
              <EditIcon />
            </abbr>
          </Fab>
          <Fab id="btn-DeleteAnimal" size="small" color="error">
            <abbr title="Deletar">
              <DeleteIcon />
            </abbr>
          </Fab>
        </>
      );
    },
  },
];
const rows = [
  {
    id: 1,
    category: "Vaca",
    name: "Mimosa",
    birthday: 5,
    type: "Gado Leiteiro",
    weight: 350,
    qtyChildreen: 4,
  },
  {
    id: 2,
    category: "Vaca",
    name: "Malhada",
    birthday: 9,
    type: "Gado Leiteiro",
    weight: 420,
    qtyChildreen: 3,
  },
  {
    id: 3,
    category: "Novilha",
    name: null,
    birthday: 2,
    type: "Gado de Corte",
    weight: 450,
    qtyChildreen: 2,
  },
  {
    id: 4,
    category: "Novilha",
    name: null,
    birthday: 2,
    type: "Gado de Corte",
    weight: 160,
    qtyChildreen: 0,
  },
  // { id: 5, category: "Boi",    name: 'Teló',   birthday: 5, type: "Gado de Corte", weight: null,qtyChildreen: null },
  // { id: 6, category: "Vaca",   name: 'Vaca006',birthday: 3, type: "Gado Leiteiro", weight: 150, qtyChildreen: 22 },
  // { id: 7, category: "Vaca",   name: 'Vaca007',birthday: 1, type: "Gado Leiteiro", weight: 440, qtyChildreen: 22 },
  // { id: 8, category: "Vaca",   name: 'Vaca008',birthday: 1, type: "Gado Leiteiro", weight: 360, qtyChildreen: 22 },
  // { id: 9, category: "Vaca",   name: 'Vaca009',birthday: 1, type: "Gado Leiteiro", weight: 650, qtyChildreen: 22 },
];

const CattleListPage = (): ReactElement => {
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
              rows={rows}
              columns={columns}
              sx={{
                border: "none",
                boxShadow: " 2px 2px 4px 2px var(--cor111)",
              }}
            />
          </div>
        </Box>
      </div>
    </>
  );
};

export default CattleListPage;
