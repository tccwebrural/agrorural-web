import { MALE, FEMALE } from "./../../../../../constants";
import { Timestamp } from "firebase/firestore";
import { NumericLiteral } from "typescript";

/**

 * @param male - Gados do tipo macho  
 */

class VaccineNotifyModel {
  id?: string;
  createdAt?: Timestamp;
  title!: string;
  description!: string;
  notifyDate!: string;
  animalName!: string;
  animalId!: number;
  animalSex!: number;
  vaccineName!: string;

}

export { VaccineNotifyModel };
