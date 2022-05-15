import { MALE, FEMALE } from "./../../../../../constants";
import { Timestamp } from "firebase/firestore";

export type Sex = {
  macho: number;
  femea: number;
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
  rebanhoAtual?: ReportCattleCategory;
  rebanhoComCausas?: ReportCattleCategory;
}

export { ReportModel, ReportCattleCategory };
