import { Timestamp } from "firebase/firestore";

type Detail = {
  macho: number;
  femea: number;
};

class ReportDetail {
  garrotes?: Detail;
  desmamados?: Detail;
  bezerros?: Detail;
  novilhos?: Detail;
  outros?: Detail;
  total?: Detail;
}

class ReportModel {
  id?: string;
  createdAt?: Timestamp;
  rebanhoAtual?: ReportDetail;
  rebanhoComCausas?: ReportDetail;
}

export { ReportModel };
