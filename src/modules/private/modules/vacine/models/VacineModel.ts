import { Timestamp } from "firebase/firestore";
class VacineModel {
  id?: string;
  name!: string;
  lote!: string;
  date_application!: string;
  expiration_date!: string;
  manufacturer!: string;
  createdAt!: Timestamp;
}

export { VacineModel };
