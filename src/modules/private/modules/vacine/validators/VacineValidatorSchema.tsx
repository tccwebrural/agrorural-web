import { Timestamp } from "firebase/firestore";
import { number } from "yup";
import { object, string } from "yup";
import {
  EMAIL_INVALID,
  INDENTIFER_INVALID,
  PASSWORD_MIN_8,
  REQUIRED_FIELD,
} from "../../../../../constants";

const VacineValidatorSchema = object({
  name: string().required(REQUIRED_FIELD),
  lote: string().required(REQUIRED_FIELD),
  date_application: string().required(REQUIRED_FIELD),
  expiration_date: string().required(REQUIRED_FIELD),
  manufacturer: string().required(REQUIRED_FIELD),
});

export { VacineValidatorSchema };
