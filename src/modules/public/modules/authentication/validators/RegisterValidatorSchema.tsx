import { object, ref, string } from "yup";
import {
  CPF_INVALID,
  CPF_REGEX,
  EMAIL_INVALID,
  PASSWORD_IS_NOT_EQUALS,
  PASSWORD_MIN_8,
  REQUIRED_FIELD,
} from "../../../../../constants";

const RegisterValidatorSchema = object({
  email: string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
  farmName: string().required(REQUIRED_FIELD),
  name: string().required(REQUIRED_FIELD),
  phone: string().required(REQUIRED_FIELD),
  cpf: string().required(REQUIRED_FIELD).matches(CPF_REGEX, CPF_INVALID),
  password: string().min(8, PASSWORD_MIN_8).required(REQUIRED_FIELD),
  passwordConfirm: string()
    .required(REQUIRED_FIELD)
    .oneOf([ref("password")], PASSWORD_IS_NOT_EQUALS),
});

export { RegisterValidatorSchema };
