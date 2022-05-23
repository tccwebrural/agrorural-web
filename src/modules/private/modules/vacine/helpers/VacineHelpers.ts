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
import { randomUUID } from "crypto";
export const VacineHelper = () => {
  const { getFarmRef } = FarmHelper();
  const { getCattleById } = CattleHelper();

  // const {getCattleRef} = CattleHelper()

  //farms/farmisid/cattles/cattleid/vacines

  const createVacine = async (cattleId: string, vacine: VacineModel) => {
    const farmRef = await getFarmRef();
    const cattle = await getCattleById(cattleId);
    vacine.createdAt = Timestamp.now();

    if (farmRef) {
      const vaccineCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,
        cattleId,
        COLLECTION_VACINES
      );
      // vacine.id = vaccineCollectionRef.id;
      return addDoc(vaccineCollectionRef, vacine);
    } else {
      throw "Algo não esperado ocorreu, não foi possível encontrar a referência da fazenda do usuário atual";
    }
  };
  const updateVacineId = async (
    vacine: VacineModel,

    cattleId: string,
    vacineiD: string
  ) => {
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

    if (farmRef && cattle) {
      const vaccineCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,
        cattleId,
        COLLECTION_VACINES
      );
      const vacineRef = doc(
        firestore,
        vaccineCollectionRef.path,

        vacineId
      );

      return deleteDoc(vacineRef);
    } else {
      throw "Algo não esperado ocorreu, não foi possível encontrar a referência da fazenda do usuário atual";
    }
  };

  // const getVacineById = async (cattleId: string) => {
  //   const farmRef = await getFarmRef();
  //   // const cattleRef = await create
  //   if (farmRef) {
  //     const vacinesCollectionRef = collection(
  //       firestore,
  //       COLLECTION_FARMS,
  //       farmRef.id,
  //       COLLECTION_CATTLES,
  //       cattleId,
  //       COLLECTION_VACINES
  //     );
  //     const vacineRef = doc(firestore, vacinesCollectionRef.path, cattleId);

  //     const cattleDoc = await getDoc(vacineRef);
  //     return { id: cattleDoc.id, ...cattleDoc.data() } as VacineModel;
  //   }
  // };
  const getVacineRef = async (vacineId: string, cattleId: string) => {
    const farmRef = await getFarmRef();

    if (farmRef) {
      const vacineCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,
        cattleId,
        COLLECTION_VACINES
      );
      const vacineRef = doc(firestore, vacineCollectionRef.path, vacineId);

      return vacineRef;
    }
  };
  const getVacineById = async (vacineId: string, cattleId: string) => {
    const vacineRef = await getVacineRef(vacineId, cattleId);
    if (vacineRef) {
      const vacineDoc = await getDoc(vacineRef);
      if (vacineDoc.exists()) {
        return { id: vacineDoc.id, ...vacineDoc.data() } as VacineModel;
      }
    }
  };

  const getAllVacines = async (cattleId: string) => {
    let vacines: Array<VacineModel> = [];

    // aaaaaaa
    const farmRef = await getFarmRef();
    const cattle = await getCattleById(cattleId);

    if (farmRef && cattle) {
      const vaccineCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES,
        cattleId,
        COLLECTION_VACINES
      );

      const findByCollectionRef = query(vaccineCollectionRef);
      const response = await getDocs(findByCollectionRef);
      vacines = response.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as VacineModel;
      });
    }
    return vacines;
  };

  return {
    getAllVacines,
    getVacineById,
    deleteVacineId,
    updateVacineId,
    createVacine,
    getVacineRef,
  };
};
