import { DocumentReference, Timestamp } from "firebase/firestore";

export interface UserModel {
  id: string;
  name: string;
  email: string;

  farmRef: DocumentReference;
  createdAt: Timestamp;
  active: boolean;
  cpf: string;
  phone: string;
  farmName: string;
}
export interface PasswordResetModel {
  email: string;
}
export interface PerfilModelUser {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  // farmRef: DocumentReference;
}
export interface RegisterUserModel {
  name: string;
  email: string;
  password: string;
  farmName: string;
  phone: string;
  cpf: string;
}
