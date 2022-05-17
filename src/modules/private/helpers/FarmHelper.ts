import { PerfilModelUser } from "modules/public/models/UserModel";
import { firestore } from "configs/Firebase";
import { COLLECTION_FARMS } from "../../../constants";
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../../providers/AuthProvider";
import { FarmModel } from "../models/FarmModel";

export const FarmHelper = () => {
  const authContext = useAuth();

  const getFarmRef = async (): Promise<DocumentReference | undefined> => {
    const user = await authContext.getUser();
    if (user) {
      return user.farmRef;
    }
  };

  const getFarmValues = async (): Promise<FarmModel | undefined> => {
    const farmRef = await getFarmRef();
    if (farmRef) {
      const farmDoc = await getDoc(farmRef);
      return { id: farmDoc.id, ...farmDoc.data() } as FarmModel;
    }
  };

  const updateFarm = async (farm: PerfilModelUser, farmId: FarmModel) => {
    const farmRef = await getFarmRef();
    if (farmRef) {
      // const farmDoc = await doc(farmRef);
      // return { id: farmDoc.id, ...farmDoc.data() } as FarmModel;
      const farmCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmId.id
      );

      const farmRef = await doc(firestore, farmCollectionRef.path);
      return updateDoc(farmRef, { name: farm.name });
    }
  };
  return { getFarmRef, getFarmValues, updateFarm };
};
