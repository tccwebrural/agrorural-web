import { Box, Button, Grid, Modal } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { VacineHelper } from "../../vacine/helpers/VacineHelpers";
import { VacineModel } from "../../vacine/models/VacineModel";

const VaccineModalDelete = (): ReactElement => {
  // const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  // const [selectedVacine, setSelectedVacine] = useState<VacineModel>();
  // const [vacines, setVacines] = useState<VacineModel[]>([]);

  // const vacineHelper = VacineHelper();

  // const { id } = useParams();
  // const openDeleteVacineModal = (vacineSelected: VacineModel) => {
  //   setSelectedVacine(vacineSelected);
  //   setModalDeleteOpen(true);
  // };
  // useEffect(() => {
  //   if (id) {
  //     vacineHelper.getAllVacines(id).then(setVacines);
  //   }
  // }, []);

  // const HandleDeleteVacine = async (isToDelete: boolean) => {
  //   if (isToDelete && selectedVacine && selectedVacine.id && id) {
  //     await vacineHelper.deleteVacineId(selectedVacine.id, id);
  //     toast.success(`Vacina ${selectedVacine.name} deletado com sucesso`);
  //     await vacineHelper.getAllVacines(id).then(setVacines);
  //   } else {
  //   }
  // };
  // if (selectedVacine) {
  //   return (
  //     <>
  //       <Modal
  //         hideBackdrop
  //         open={modalDeleteOpen}
  //         onClose={() => HandleDeleteVacine(false)}
  //         sx={{
  //           position: "absolute",
  //           top: "50%",
  //           left: "50%",
  //           transform: "translate(-50%, -50%)",
  //           width: 560,
  //           height: 250,
  //           bgcolor: "white",
  //           borderRadius: "10px",
  //           boxShadow: 11,
  //           p: 4,
  //         }}
  //       >
  //         <Box>
  //           <div id="bloco-modal">
  //             <Grid sx={{ margin: "2%  2%" }}>
  //               <span>
  //                 Você realmente deseja excluir esse animal ({" "}
  //                 {selectedVacine.name} )?
  //               </span>
  //             </Grid>
  //             <Grid
  //               sx={{
  //                 margin: "2%  15% 2% 2%",
  //                 display: "flex",
  //               }}
  //             >
  //               <p>
  //                 Após a exclusão não será possível recuperar os dados do animal
  //                 ( {selectedVacine.name} )
  //               </p>
  //             </Grid>

  //             <Grid
  //               sx={{
  //                 display: "flex",
  //                 margin: " 1%",
  //                 justifyContent: "center",
  //               }}
  //             >
  //               <Grid
  //                 sx={{
  //                   margin: " 6% 1%",
  //                   borderRadius: "10px",
  //                 }}
  //               >
  //                 <Button
  //                   id="btn-modalDelet"
  //                   onClick={() => HandleDeleteVacine(true)}
  //                 >
  //                   Sim
  //                 </Button>{" "}
  //               </Grid>
  //               <Grid
  //                 sx={{
  //                   margin: " 6% 1%",
  //                   borderRadius: "10px",
  //                 }}
  //               >
  //                 <Button
  //                   id="btn-modalCancel"
  //                   onClick={() => HandleDeleteVacine(false)}
  //                 >
  //                   Não
  //                 </Button>{" "}
  //               </Grid>
  //             </Grid>
  //           </div>
  //         </Box>
  //       </Modal>
  //     </>
  //   );
  // }
  return (
    <>
      <h1></h1>
    </>
  );
};

export default VaccineModalDelete;
