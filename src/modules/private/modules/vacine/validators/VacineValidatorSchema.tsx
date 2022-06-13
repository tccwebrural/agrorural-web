import { Timestamp } from "firebase/firestore";
import { date, number } from "yup";
import { object, string } from "yup";
import {
  EMAIL_INVALID,
  INDENTIFER_INVALID,
  INFERIOR_DATE_2005,
  PASSWORD_MIN_8,
  REQUIRED_FIELD,
  TODAY_DATE,
} from "../../../../../constants";
import { parse, isDate } from "date-fns";
import { isPropertyAssignment } from "typescript";

function parseDateString(value: any, originalValue: any) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const VacineValidatorSchema = object({
  name: string().required(REQUIRED_FIELD),
  lote: string().required(REQUIRED_FIELD),
  // date_application: string().required(REQUIRED_FIELD),
  date_application: date()
    .required(REQUIRED_FIELD)
    .transform(parseDateString)
    .max(new Date(), TODAY_DATE)
    .min("2005-01-01", INFERIOR_DATE_2005),
  expiration_date: date()
    .required(REQUIRED_FIELD)
    .transform(parseDateString)
    // .min(new Date(), "data maior que o dia atual"),
    .min(new Date(), INFERIOR_DATE_2005),

  // expiration_date: date().transform(parseDateString).min(date),

  manufacturer: string().required(REQUIRED_FIELD),
});

export { VacineValidatorSchema };
