import { MALE, FEMALE } from "./../../../../../constants";
import { Timestamp } from "firebase/firestore";

/**
 * Busca dados do usuário a partir do uid de autenticação do FireAuthentication;
 *
 * Caso o usuário exista na coleção de usuários da aplicação, o state de usuário
 * será atualizado com os dados salvos no documento.
 *
 * Caso contrário uma mensagem de erro é retornado;
 *
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
