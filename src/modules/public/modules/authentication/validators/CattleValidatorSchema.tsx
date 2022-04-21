import { Timestamp } from "firebase/firestore";
import { number } from "yup";
import { object, string } from "yup";
import {
  EMAIL_INVALID,
  INDENTIFER_INVALID,
  PASSWORD_MIN_8,
  REQUIRED_FIELD,
} from "../../../../../constants";

const CattleValidatorSchema = object({
  name: string().required(REQUIRED_FIELD),
  identifier: number().required(REQUIRED_FIELD),
  weigth: number().required(REQUIRED_FIELD),
  qtyChildren: number().required(REQUIRED_FIELD),
  birthday: string().required(REQUIRED_FIELD),
  sex: number().required(REQUIRED_FIELD),
  type: number().required(REQUIRED_FIELD),
});

export { CattleValidatorSchema };
