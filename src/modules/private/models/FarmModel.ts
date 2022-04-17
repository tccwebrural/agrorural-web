import {
  CollectionReference,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";

export class FarmModel {
  id!: string;
  name!: string;
  createdAt!: Timestamp;
  owner!: DocumentReference;
  cattles?: CollectionReference;
  statements?: CollectionReference;
}
