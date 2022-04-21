import { Timestamp } from "firebase/firestore";
import { object, string } from "yup";
import {
  EMAIL_INVALID,
  INDENTIFER_INVALID,
  PASSWORD_MIN_8,
  REQUIRED_FIELD,
} from "../../../../../constants";

const CattleValidatorSchema = object({
  name: string().required(REQUIRED_FIELD),
  indentifier: string().required(INDENTIFER_INVALID),
  weight: string().required(REQUIRED_FIELD),
  qtyChildren: string().required(REQUIRED_FIELD),
  birthday: string().required(REQUIRED_FIELD),
  sex: string().required(REQUIRED_FIELD),
  type: string().required(REQUIRED_FIELD),
});

export { CattleValidatorSchema };
