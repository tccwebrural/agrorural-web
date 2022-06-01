import { MALE, FEMALE } from "./../../../../../constants";
import { Timestamp } from "firebase/firestore";

/**

 * @param male - Gados do tipo macho  
 */

export type Sex = {
  male: number;
  female: number;
};

class ReportCattle {
  garrotes!: Sex;
  desmamados!: Sex;
  bezerros!: Sex;
  novilhos!: Sex;
  outros!: Sex;
  total!: Sex;
}

class ReportModel {
  id?: string;
  createdAt!: Timestamp;
  rebanhoAtual!: ReportCattle;
  rebanhoComCausas!: ReportCattle;
  DeathByOwnConsuption!: ReportCattle;
  DeathByDiversousCases!: ReportCattle;
}

export { ReportModel, ReportCattle };
