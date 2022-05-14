import { Timestamp } from "firebase/firestore";

export type Sex = {
  macho: number;
  femea: number;
};

class Report_cattle_cattegory {
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
  rebanhoAtual?: Report_cattle_cattegory;
  rebanhoComCausas?: Report_cattle_cattegory;
}

export { ReportModel, Report_cattle_cattegory };
