import { object, string } from "yup";
import {
  EMAIL_INVALID,
  PASSWORD_MIN_8,
  REQUIRED_FIELD,
} from "../../../../../constants";

const LoginValidatorSchema = object({
  email: string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
  password: string().min(8, PASSWORD_MIN_8).required(REQUIRED_FIELD),
});

export { LoginValidatorSchema };
