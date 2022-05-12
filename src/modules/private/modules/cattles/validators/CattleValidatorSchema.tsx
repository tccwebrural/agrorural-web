import { Timestamp } from "firebase/firestore";
import { number } from "yup";
import { object, string, date } from "yup";
import {
  EMAIL_INVALID,
  INDENTIFER_INVALID,
  INDENTIFIER_MIN_1,
  PASSWORD_MIN_8,
  QTDY_CHILDREN_MAX_15,
  QTDY_CHILDREN_MIN_0,
  QTDY_WEIGHT_MAX_1200,
  REQUIRED_FIELD,
} from "../../../../../constants";
// const today = new Date(10).getUTCDate();
const now = Date.now();
const today = new Date();

const CattleValidatorSchema = object({
  name: string().required(REQUIRED_FIELD),
  identifier: number().required(REQUIRED_FIELD).min(1, INDENTIFIER_MIN_1),
  weigth: number().required(REQUIRED_FIELD).max(1200, QTDY_WEIGHT_MAX_1200),
  qtyChildren: number().required(REQUIRED_FIELD).max(15, QTDY_CHILDREN_MAX_15),
  birthday: string().required(REQUIRED_FIELD),

  sex: number().required(REQUIRED_FIELD),
  type: number().required(REQUIRED_FIELD),
});

export { CattleValidatorSchema };
