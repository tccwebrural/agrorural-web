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
import { COLLECTION_CATTLES, COLLECTION_FARMS } from "../../../../../constants";
import { FarmHelper } from "../../../helpers/FarmHelper";
import { CattleModel } from "../models/CattleModel";

export const CattleHelper = () => {
  const { getFarmRef } = FarmHelper();

  const getCattleByIdentificador = async (
    identificador?: number
  ): Promise<CattleModel | undefined> => {
    if (identificador) {
      //BUSCAR NO FIREBASE VACAS COM O IDENTIFICADOR
      //https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
      return new Promise(() => undefined);
    }
  };

  const createCattle = async (cattle: CattleModel) => {
    const farmRef = await getFarmRef();

    if (farmRef) {
      cattle.createdAt = Timestamp.now();
      cattle.identifier = 10;
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

  const updateCattleId = async (cattle: CattleModel) => {
    const farmRef = await getFarmRef();
    if (farmRef && cattle.id) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );
      const cattleRes = await getCattleByIdentificador(cattle.identifier);
      if (cattleRes) {
        throw "JÀ EXISTE UM  GADO COM O MESMO IDENTIFICADOR";
      } else {
        const cattleRef = doc(firestore, cattlesCollectionRef.path, cattle.id);
        return updateDoc(cattleRef, { ...cattle });
      }
    } else {
      //TODO: Exibe mensagem de erro
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

  const getCattleById = async (cattleId: string) => {
    const farmRef = await getFarmRef();
    if (farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );
      const cattleRef = doc(firestore, cattlesCollectionRef.path, cattleId);

      const cattleDoc = await getDoc(cattleRef);
      return { id: cattleDoc.id, ...cattleDoc.data() } as CattleModel;
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
    getCattleById,
  };
};
