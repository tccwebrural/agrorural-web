import { COLLECTION_FARMS } from "./../../../constants";
import { PerfilModelUser } from "modules/public/models/UserModel";
import { firestore } from "configs/Firebase";
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
  // const user = await getUser();
  // const userRef = doc(firestore, COLLECTION_USERS, user.id);
  // // const userDoc = await getDoc(userRef);

  // return updateDoc(userRef, {
  //   cpf: formData.cpf,
  //   name: formData.name,
  //   phone: formData.phone,
  //   // ...formData,
  // });
  const updateFarmName = async (farm: PerfilModelUser) => {
    const farmId = await getFarmRef();

    if (farmId?.id) {
      const farmRef = doc(firestore, COLLECTION_FARMS, farmId.id);

      return updateDoc(farmRef, { name: farm.farmName });
    }

    // if (farmRefId) {
    //   // const farmDoc = await doc(farmRef);
    //   // return { id: farmDoc.id, ...farmDoc.data() } as FarmModel;
    //   const farmCollectionRef = collection(
    //     firestore,
    //     COLLECTION_FARMS,
    //     farmRefId.id
    //   );

    //   const farmRef = await doc(
    //     firestore,
    //     farmCollectionRef.path,
    //     farmRefId.id
    //   );
    //   return updateDoc(farmRef, { name: farm.name });
  };

  return { getFarmRef, getFarmValues, updateFarmName };
};
