import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { collection } from "firebase/firestore";
import { Formik } from "formik";
import { useGlobalLoading } from "providers/GlobalLoadingProvider";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getControls } from "utils/FormUtils";
import { getFireError } from "utils/HandleFirebaseError";
import "../../../styles/NotifyVaccine.css";
import { CattleHelper } from "../../cattles/helpers/CattleHelper";
import { CattleModel } from "../../cattles/models/CattleModel";
import { VacineHelper } from "../../vacine/helpers/VacineHelpers";
import { VacineModel } from "../../vacine/models/VacineModel";
import { VacineNotifyHelpers } from "../helpers/VacineNotifyHelpers";
import { VaccineNotifyModel } from "../models/VaccineNotifyModel";

const vaccineBrucelose = "Brucelose";
const vaccineFebreAftosa = "Febre Aftosa";
const vaccineRaiva = "Contra Raiva";

const VaccineBrucelose = (): ReactElement => {
  const [animal, setAnimal] = useState<CattleModel>();

  const submitForm = (cattle: CattleModel) => {};

  const [initialValues, setInitialValues] = useState<CattleModel>({
    identifier: 0,
    weigth: 0,
    name: "",
    type: 1,
    birthday: "",
    sex: 1,
    qtyChildren: 0,
  });
  const [cattles, setCattles] = useState<CattleModel[]>([]);

  const getMonthFromDate = (date: string) => {
    var birthDay = new Date(date);
    var today = new Date();
    var birthDayYear = birthDay.getFullYear();
    var todayYear = today.getFullYear();
    var birthDayMonth = birthDay.getMonth();
    var todayMonth = today.getMonth();

    return todayMonth + 12 * todayYear - (birthDayMonth + 12 * birthDayYear);
  };

  const cattlehelpers = CattleHelper();
  const vacineHelpers = VacineNotifyHelpers();
  // useEffect(() => {
  //   cattlehelpers.getAllCattles().then((cattles) => {
  //     for (let index = 0; index < cattles.length; index++) {
  //       const cattle = {
  //         ...cattles[index],
  //         age: getMonthFromDate(cattles[index].birthday),
  //         idCattle: cattles[index].id,

  //         // if(){
  //         //   vacina: vacineHelpers.vaccinesRef(idCattle).then((vaccinesRef) => {

  //         //   }),
  //         // }

  //         // vacine: vacineHelpers.vaccinesRef(),
  //       };
  //       // vacineHelpers.vaccinesRef().then((vaccinesRef) => {

  //       // })
  //       if (cattle.sex === 2) {
  //         if (cattle.age >= 3 && cattle.age <= 8) {
  //           //se nao tomou a vacina
  //           console.log("Brucelose: " + cattle.name);
  //         }
  //       }
  //       //  else if (mesAtual === 5) {

  //       // } else if (mesAtual === 11) {

  //       // }
  //     }
  //     console.log(cattles);
  //   });
  // }, []);

  useEffect(() => {
    cattlehelpers.getAllCattles().then(setCattles);
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
  
        <Grid sx={{ margin: "1%" }}>
          <div id="Bloco-Notificacoes">
            <div id="color2"></div>
            <div></div>
            <div id="text-notify">
              <div id="text-notify-title-Red">
                O animal {initialValues.name} deve ser vacinado!
              </div>
              <div id="text-notify-dados">
                <form id="dados">
                  <p>
                    <span className="Txt-NotifyVaccine">Nome da Vacina:</span>{" "}
                  </p>
                  <p>
                    <span className="Txt-NotifyVaccine">Data da Vacina:</span>{" "}
                  </p>
                </form>
                <form id="dados">
                  <p>
                    <span className="Txt-NotifyVaccine">Nome do Animal:</span>{" "}
                  </p>
                  <p>
                    <span className="Txt-NotifyVaccine">Gênero:</span>{" "}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Grid>

        {/* BLOCO DO FORMIK ANITGO */}
        {/* <Formik
          enableReinitialize={true}
          onSubmit={submitForm}
          initialValues={initialValues}
        >
          {(formik) => (
            <Grid sx={{ margin: "1%" }}>
              <div id="Bloco-Notificacoes">
                <div id="color2"></div>
                <div></div>
                <div id="text-notify">
                  <div id="text-notify-title-Red">
                    O animal {initialValues.name} deve ser vacinado!
                  </div>
                  <div id="text-notify-dados">
                    <form id="dados">
                      <p>
                        <span className="Txt-NotifyVaccine">
                          Nome da Vacina:
                        </span>{" "}
                      </p>
                      <p>
                        <span className="Txt-NotifyVaccine">
                          Data da Vacina:
                        </span>{" "}
                      </p>
                    </form>
                    <form id="dados">
                      <p>
                        <span className="Txt-NotifyVaccine">
                          Nome do Animal:
                        </span>{" "}
                      </p>
                      <p>
                        <span className="Txt-NotifyVaccine">Gênero:</span>{" "}
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </Grid>
          )}
        </Formik> */}
        {/* FIM DO BLOCO FORMIK */}
      </Box>
    </>
  );
};
export default VaccineBrucelose;