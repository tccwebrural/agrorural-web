import { Timestamp } from "firebase/firestore";

const VACINE_TYPES: { [key: number]: string } = {
  1: "Febre aftosa",
  2: "Brucelose",
  3: "Raiva",
  // 4: "Clostridioses",
  // 5: "Botulismo"
  // 6:
};
class VacineModel {
  id?: string;
  name!: string;
  vaccineType?: number;
  lote!: number;
  date_application!: string;
  expiration_date!: string;
  manufacturer!: string;
  createdAt?: Timestamp;
}

export { VacineModel, VACINE_TYPES };
