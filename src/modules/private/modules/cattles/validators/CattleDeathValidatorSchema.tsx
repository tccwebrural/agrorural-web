import { Timestamp } from "firebase/firestore";
import { number } from "yup";
import { object, string, date, ValidationError } from "yup";
import {
  EMAIL_INVALID,
  INDENTIFER_INVALID,
  INDENTIFIER_MIN_1,
  INFERIOR_DATE_2005,
  PASSWORD_MIN_8,
  QTDY_CHILDREN_MAX_15,
  QTDY_CHILDREN_MIN_0,
  QTDY_WEIGHT_MAX_1200,
  REQUIRED_FIELD,
  TODAY_DATE,
} from "../../../../../constants";
import { parse, isDate } from "date-fns";

const CattleDeathValidatorSchema = object({
  deathBy: string().required(REQUIRED_FIELD),
});

export { CattleDeathValidatorSchema };
