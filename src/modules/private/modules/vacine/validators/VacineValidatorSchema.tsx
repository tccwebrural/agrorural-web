import { isDate, parse } from "date-fns";
import { date, number, object, string } from "yup";
import {
  DATE_AFTER_TODAY,
  INFERIOR_DATE_2005,
  LOTE_MIN_0,
  REQUIRED_FIELD,
  TODAY_DATE,
} from "../../../../../constants";

function parseDateString(value: any, originalValue: any) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const VacineValidatorSchema = object({
  name: string().required(REQUIRED_FIELD),
  lote: number().required(REQUIRED_FIELD).min(0, LOTE_MIN_0),
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
    .min(new Date(), DATE_AFTER_TODAY),

  // expiration_date: date().transform(parseDateString).min(date),

  manufacturer: string().required(REQUIRED_FIELD),
});

export { VacineValidatorSchema };
