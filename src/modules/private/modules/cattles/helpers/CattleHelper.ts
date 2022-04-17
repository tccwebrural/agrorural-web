import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../../../configs/Firebase";
import { FarmModel } from "../../../models/FarmModel";
import { CattleModel } from "../models/CattleModel";
import { COLLECTION_CATTLES, COLLECTION_FARMS } from "../../../../../constants";
import { FarmHelper } from "../../../helpers/FarmHelper";

export const CattleHelper = () => {
  const { getFarmRef } = FarmHelper();

  const createCattle = (cattle: CattleModel) => {
    const farmRef = getFarmRef();
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

  const updateCattleId = (cattle: CattleModel, cattleId: string) => {
    const farmRef = getFarmRef();
    if (farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,

        COLLECTION_CATTLES
      );

      const cattleRef = doc(firestore, cattlesCollectionRef.path, cattleId);
      return updateDoc(cattleRef, {
        cattle,
      });

      // return deleteDoc(cattleRef);
    }
  };

  const deleteCattleId = (cattleId: string) => {
    const farmRef = getFarmRef();
    if (farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );
      const cattleRef = doc(firestore, cattlesCollectionRef.path, cattleId);

      return deleteDoc(cattleRef);
      // return deleteDoc(cattleRef);
    }
  };

  const getAllCattles = async (farm: FarmModel) => {
    let cattles: Array<CattleModel> = [];
    const farmRef = getFarmRef();
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

  return { createCattle, getAllCattles, deleteCattleId, updateCattleId };
};
