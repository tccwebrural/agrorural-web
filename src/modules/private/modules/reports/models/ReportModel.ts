import { MALE, FEMALE } from "./../../../../../constants";
import { Timestamp } from "firebase/firestore";

/**

 * @param male - Gados do tipo macho  
 */

export type Sex = {
  male: number;
  female: number;
};

class ReportCattleCategory {
  garrotes!: Sex;
  desmamados!: Sex;
  bezerros!: Sex;
  novilhos!: Sex;
  outros!: Sex;
  total!: Sex;
}

class ReportModel {
  id?: string;
  createdAt?: Timestamp;
  rebanhoAtual!: ReportCattleCategory;
  rebanhoComCausas!: ReportCattleCategory;
}

export { ReportModel, ReportCattleCategory };
