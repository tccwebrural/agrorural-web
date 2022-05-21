import { firestore } from "configs/Firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { FarmHelper } from "modules/private/helpers/FarmHelper";
import {
  COLLECTION_FARMS,
  COLLECTION_NOTIFICATIONS,
  COLLECTION_REPORTS,
} from "../../../../../constants";
import { VaccineNotifyModel } from "../models/VaccineNotifyModel";

export const VacineNotifyHelpers = () => {
  const { getFarmRef } = FarmHelper();

  const createReport = async (notifications: VaccineNotifyModel) => {
    const farmRef = await getFarmRef();

    if (farmRef) {
      notifications.createdAt = Timestamp.now();

      const reportsCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_NOTIFICATIONS
      );
      return addDoc(reportsCollectionRef, notifications);
    }
  };

  const getAllNotifications = async () => {
    let reports: Array<VaccineNotifyModel> = [];
    const farmRef = await getFarmRef();
    if (farmRef) {
      const reportsCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_REPORTS
      );
      const findByCollectionRef = query(reportsCollectionRef);
      const response = await getDocs(findByCollectionRef);
      reports = response.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as VaccineNotifyModel;
      });
    }
    return reports;
  };

  return {
    createReport,
    getAllNotifications,
  };
};
