import { CattleHelper } from "./../../cattles/helpers/CattleHelper";
import {
  COLLECTION_CATTLES,
  COLLECTION_VACINES,
} from "./../../../../../constants";
// import { randomUUID } from "crypto";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../../../configs/Firebase";
import { COLLECTION_FARMS } from "../../../../../constants";
import { FarmHelper } from "../../../helpers/FarmHelper";
// import { CattleModel } from "../models/CattleModel";
import { VacineModel } from "../models/VacineModel";
export const VacineHelper = () => {
  const { getFarmRef } = FarmHelper();
  const { getCattleById } = CattleHelper();

  // const {getCattleRef} = CattleHelper()

  //farms/farmisid/cattles/cattleid/vacines

  const createVacine = async (cattleId: string, vacine: VacineModel) => {
    const farmRef = await getFarmRef();
    const cattle = await getCattleById(cattleId);

    if (farmRef && cattle) {
      vacine.createdAt = Timestamp.now();
      const vaccineCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,
        cattleId,
        COLLECTION_VACINES
      );
      return addDoc(vaccineCollectionRef, vacine);
    } else {
      throw "Algo não esperado ocorreu, não foi possível encontrar a referência da fazenda do usuário atual";
    }
  };
  const updateVacineId = async (vacine: VacineModel, cattleId: string) => {
    const farmRef = await getFarmRef();
    const cattle = await getCattleById(cattleId);

    if (farmRef && vacine.id) {
      const vacinesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,
        cattleId,
        COLLECTION_VACINES
      );

      const vacinetleRef = await doc(
        firestore,
        vacinesCollectionRef.path,
        vacine.id
      );
      return updateDoc(vacinetleRef, { ...vacine });
    } else {
      //TODO: Exibe mensagem de erro
    }
  };

  const deleteVacineId = async (vacineId: string, cattleId: string) => {
    const farmRef = await getFarmRef();
    const cattle = await getCattleById(cattleId);

    if (farmRef) {
      const vacinesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,
        cattleId,
        COLLECTION_VACINES
      );
      const vacineRef = doc(firestore, vacinesCollectionRef.path, vacineId);

      return deleteDoc(vacineRef);
    }
  };

  const getVacineById = async (cattleId: string) => {
    const farmRef = await getFarmRef();
    // const cattleRef = await create
    if (farmRef) {
      const vacinesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,
        COLLECTION_VACINES
      );
      const vacineRef = doc(firestore, vacinesCollectionRef.path, cattleId);

      const cattleDoc = await getDoc(vacineRef);
      return { id: cattleDoc.id, ...cattleDoc.data() } as VacineModel;
    }
  };

  const getAllVacines = async () => {
    let cattles: Array<VacineModel> = [];
    const farmRef = await getFarmRef();
    if (farmRef) {
      const vacinesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,

        COLLECTION_VACINES
      );
      const findByCollectionRef = query(vacinesCollectionRef);
      const response = await getDocs(findByCollectionRef);
      cattles = response.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as VacineModel;
      });
    }
    return cattles;
  };

  return {
    getAllVacines,
    getVacineById,
    deleteVacineId,
    updateVacineId,
    createVacine,
  };
};
