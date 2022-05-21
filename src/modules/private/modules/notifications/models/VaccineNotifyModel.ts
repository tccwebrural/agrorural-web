import { MALE, FEMALE } from "./../../../../../constants";
import { Timestamp } from "firebase/firestore";

/**

 * @param male - Gados do tipo macho  
 */

class VaccineNotifyModel {
  id?: string;
  createdAt?: Timestamp;
  title!: string;
  description!: string;
  notifyDate!: string;
}

export { VaccineNotifyModel };
