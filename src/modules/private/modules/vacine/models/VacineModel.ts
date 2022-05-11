import { Timestamp } from "firebase/firestore";
class VacineModel {
  id?: string;
  name!: string;
  lote!: number;
  date_application!: string;
  expiration_date!: string;
  manufacturer!: string;
  createdAt?: Timestamp;
}

export { VacineModel };
