import { Timestamp } from "firebase/firestore";

enum CattleTypes {
  LEITEIRO = "LEITEIRO",
  CORTE = "CORTE",
}
enum CattleSexs {
  MACHO = "MACHO",
  FEMEA = "FEMEA",
}
enum CattleDethTypes {
  CONSUMO_PROPRIO = "CONSUMO PROPRIO",
  OBITOS_CAUSAS_DIVERSAS = "OBITOS CAUSAS DIVERSAS",
}

class CattleModel {
  id?: string;
  identifier!: number;
  birthday?: Timestamp;
  name!: string;
  qtyChildren?: number;
  sex!: CattleSexs;
  type!: CattleTypes;
  weigth!: number;
  createdAt?: Timestamp;
  deathBy?: CattleDethTypes;
}

export { CattleTypes, CattleSexs, CattleModel, CattleDethTypes };
