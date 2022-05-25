import { COLLECTION_CATTLES } from "./../../../../../constants";
// import { randomUUID } from "crypto";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../../../../configs/Firebase";
import { COLLECTION_FARMS } from "../../../../../constants";
import { FarmHelper } from "../../../helpers/FarmHelper";
import { CattleDeathModel, CattleModel } from "../models/CattleModel";

export const CattleHelper = () => {
  const { getFarmRef } = FarmHelper();

  const getCattlesByIdentifier = async (identifier: number) => {
    const farmRef = await getFarmRef();
    let cattles = new Array<CattleModel>();
    if (identifier && farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );

      const whereByIdentfier = query(
        cattlesCollectionRef,
        where("identifier", "==", identifier)
      );
      const response = await getDocs(whereByIdentfier);
      cattles = response.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as CattleModel;
      });
    }
    return cattles;
  };

  const createCattle = async (cattle: CattleModel) => {
    const farmRef = await getFarmRef();

    if (farmRef) {
      cattle.createdAt = Timestamp.now();
      const cattles = await getCattlesByIdentifier(cattle.identifier);
      if (cattles.length > 0) {
        throw "Esse identificador já existe, por favor troque para um novo!";
      } else {
        const cattlesCollectionRef = collection(
          firestore,
          COLLECTION_FARMS,
          farmRef.id,
          COLLECTION_CATTLES
        );
        return addDoc(cattlesCollectionRef, cattle);
      }
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

      const cattles = await getCattlesByIdentifier(cattle.identifier);
      //REMOVER CATTLE ATUAL DA ATUALIZAÇÃO
      for (let index = 0; index < cattles.length; index++) {
        const item = cattles[index];
        if (item.id === cattle.id) {
          cattles.splice(index, 1);
        }
      }

      if (cattles.length > 0) {
        throw "JÀ EXISTE UM  GADO COM O MESMO IDENTIFICADOR";
      } else {
        const cattleRef = await doc(
          firestore,

          cattlesCollectionRef.path,
          cattle.id
        );
        return updateDoc(cattleRef, { ...cattle });
      }
    } else {
      throw "NÃO PODE ATUALIZAR UM CATTLE SEM FORNECER O ID";
    }
  };

  const updateDeathTypes = async (cattle: CattleModel) => {
    const farmRef = await getFarmRef();
    if (farmRef && cattle.id) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );

      //REMOVER CATTLE ATUAL DA ATUALIZAÇÃO

      const cattleRef = await doc(
        firestore,

        cattlesCollectionRef.path,
        cattle.id
      );
      if (cattle.deathBy) {
        return updateDoc(cattleRef, { deathBy: cattle.deathBy });
      }
    }
  };
  // const updateDeathTypes = async (cattle: CattleModel) => {

  //   const farmRef = await getFarmRef();

  //   if (farmRef && cattle.id) {
  //     const cattlesCollectionRef = collection(
  //       firestore,
  //       COLLECTION_FARMS,
  //       farmRef.id,
  //       COLLECTION_CATTLES
  //     );

  //     const cattleRef = await doc(
  //       firestore,

  //       cattlesCollectionRef.path,
  //       cattle.id
  //     );
  //     // return updateDoc(cattleRef, { deathBy: cattle.deathBy });
  //     if (cattle.deathBy && cattle.id) {
  //       return setDoc(cattleRef, { deathBy: cattle.deathBy });
  //     }
  //   }
  // };
  const getCattleRef = async (cattleId: string) => {
    const farmRef = await getFarmRef();
    if (farmRef) {
      const cattlesCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_CATTLES
      );
      const cattleRef = doc(firestore, cattlesCollectionRef.path, cattleId);

      return cattleRef;
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
    const cattleRef = await getCattleRef(cattleId);
    if (cattleRef) {
      const cattleDoc = await getDoc(cattleRef);
      if (cattleDoc.exists()) {
        return { id: cattleDoc.id, ...cattleDoc.data() } as CattleModel;
      }
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
    getCattleRef,
    updateDeathTypes,
  };
};
