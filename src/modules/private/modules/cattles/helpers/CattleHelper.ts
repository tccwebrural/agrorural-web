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
import { COLLECTION_CATTLES, COLLECTION_FARMS } from "../../../../../constants";
import { FarmHelper } from "../../../helpers/FarmHelper";
import { CattleModel } from "../models/CattleModel";

export const CattleHelper = () => {
  const { getFarmRef } = FarmHelper();

  const createCattle = async (cattle: CattleModel) => {
    const farmRef = await getFarmRef();
    if (farmRef) {
      cattle.createdAt = Timestamp.now();
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );
      return addDoc(cattlesCollectionRef, cattle);
    } else {
      throw "Algo não esperado ocorreu, não foi possível encontrar a referência da fazenda do usuário atual";
    }
  };

  const updateCattleId = async (cattle: CattleModel, cattleId: string) => {
    const farmRef = await getFarmRef();
    if (farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );

      const cattleRef = doc(firestore, cattlesCollectionRef.path, cattleId);
      return updateDoc(cattleRef, { ...cattle });
    }
  };

  const deleteCattleId = async (cattleId: string) => {
    const farmRef = await getFarmRef();
    if (farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );
      const cattleRef = doc(firestore, cattlesCollectionRef.path, cattleId);

      return deleteDoc(cattleRef);
    }
  };

  const getCattleId = async (cattleId: string) => {
    let cattles: Array<CattleModel> = [];

    const farmRef = await getFarmRef();
    if (farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );
      const cattleRef = doc(firestore, cattlesCollectionRef.path, cattleId);

      return getDoc(cattleRef);
      // const findByCollectionRef = query(cattlesCollectionRef);
      // const response = await getDoc(cattlesCollectionRef);
      // cattles = response.docs.map((doc) => {
      //   return { id: doc.id, ...doc.data() } as CattleModel;
      // });
    }
  };

  const getAllCattles = async () => {
    let cattles: Array<CattleModel> = [];
    const farmRef = await getFarmRef();
    if (farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );
      const findByCollectionRef = query(cattlesCollectionRef);
      const response = await getDocs(findByCollectionRef);
      cattles = response.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as CattleModel;
      });
    }
    return cattles;
  };

  return {
    createCattle,
    getAllCattles,
    deleteCattleId,
    updateCattleId,
    getCattleId,
  };
};
