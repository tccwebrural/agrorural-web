import { firestore } from "configs/Firebase";
import { doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { PerfilModelUser } from "modules/public/models/UserModel";
import { useAuth } from "../../../providers/AuthProvider";
import { FarmModel } from "../models/FarmModel";
import { COLLECTION_FARMS } from "./../../../constants";

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
  };

  return { getFarmRef, getFarmValues, updateFarmName };
};
