import { Timestamp } from "firebase/firestore";

const CATTLE_SEXS: { [key: number]: string } = {
  1: "MACHO",
  2: "FÊMEA",
};
const CATTLE_TYPES: { [key: number]: string } = {
  1: "CORTE",
  2: "LEITEIRO",
};
const CATTLE_DETH_TYPES: { [key: number]: string } = {
  1: "CONSUMO PROPRIO",
  2: "OBITOS CAUSAS DIVERSAS",
};
class CattleModel {
  id?: string;
  identifier!: number;
  birthday!: string;
  name!: string;
  qtyChildren?: number;
  sex!: number;
  type!: number;
  weigth!: number;
  createdAt?: Timestamp;
  deathBy?: number;
}

export { CATTLE_DETH_TYPES, CATTLE_SEXS, CattleModel, CATTLE_TYPES };
