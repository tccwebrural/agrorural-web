import { firestore } from "configs/Firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { FarmHelper } from "modules/private/helpers/FarmHelper";
import { COLLECTION_FARMS, COLLECTION_REPORTS } from "../../../../../constants";
import { ReportModel } from "../models/ReportModel";

export const ReportHelper = () => {
  const { getFarmRef } = FarmHelper();

  const createReport = async (report: ReportModel) => {
    const farmRef = await getFarmRef();

    if (farmRef) {
      report.createdAt = Timestamp.now();

      const reportsCollectionRef = collection(
        firestore,
        COLLECTION_FARMS,
        farmRef.id,
        COLLECTION_REPORTS
      );
      return addDoc(reportsCollectionRef, report);
    }
  };

  const getAllReports = async () => {
    let reports: Array<ReportModel> = [];
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
        return { id: doc.id, ...doc.data() } as ReportModel;
      });
    }
    return reports;
  };

  return {
    createReport,
    getAllReports,
  };
};
