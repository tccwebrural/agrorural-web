import { DocumentReference, Timestamp } from "firebase/firestore";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  farmRef: DocumentReference;
  createdAt: Timestamp;
  active: boolean;
}

export interface RegisterUserModel {
  name: string;
  email: string;
  password: string;
  farmName: string;
  phone: string;
  cpf: string;
}
