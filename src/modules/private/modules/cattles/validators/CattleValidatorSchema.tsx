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

function parseDateString(value: any, originalValue: any) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const CattleValidatorSchema = object({
  name: string().required(REQUIRED_FIELD),
  identifier: number().required(REQUIRED_FIELD).min(1, INDENTIFIER_MIN_1),
  weigth: number().required(REQUIRED_FIELD).max(1200, QTDY_WEIGHT_MAX_1200),
  qtyChildren: number().required(REQUIRED_FIELD).max(15, QTDY_CHILDREN_MAX_15),
  birthday: date()
    .required(REQUIRED_FIELD)
    .transform(parseDateString)
    .max(new Date(), TODAY_DATE)
    .min("2005-01-01", INFERIOR_DATE_2005),
  sex: number().required(REQUIRED_FIELD),
  type: number().required(REQUIRED_FIELD),
});


export { CattleValidatorSchema };
