import { DocumentReference, getDoc } from "firebase/firestore";
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

  return { getFarmRef, getFarmValues };
};
