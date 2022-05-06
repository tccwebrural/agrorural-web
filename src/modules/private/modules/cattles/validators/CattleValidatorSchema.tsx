import { Timestamp } from "firebase/firestore";
import { number } from "yup";
import { object, string, date } from "yup";
import {
  EMAIL_INVALID,
  INDENTIFER_INVALID,
  INDENTIFIER_MIN_1,
  PASSWORD_MIN_8,
  REQUIRED_FIELD,
} from "../../../../../constants";
// const today = new Date(10).getUTCDate();
const now = Date.now();
const today = new Date();

const CattleValidatorSchema = object({
  name: string().required(REQUIRED_FIELD),
  identifier: number().required(REQUIRED_FIELD).min(1, INDENTIFIER_MIN_1),
  weigth: number().required(REQUIRED_FIELD),
  qtyChildren: number().required(REQUIRED_FIELD),
  birthday: string().required(REQUIRED_FIELD),

  sex: number().required(REQUIRED_FIELD),
  type: number().required(REQUIRED_FIELD),
});

export { CattleValidatorSchema };
