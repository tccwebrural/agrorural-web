import { object, string } from "yup";
import {
  CPF_INVALID,
  CPF_REGEX,
  EMAIL_INVALID,
  PHONE_INVALID,
  PHONE_REGEX,
  REQUIRED_FIELD,
} from "../../../../../constants";

const EditProfileValidatorSchema = object({
  email: string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
  farmName: string().required(REQUIRED_FIELD),
  name: string().required(REQUIRED_FIELD),
  phone: string().required(REQUIRED_FIELD).matches(PHONE_REGEX, PHONE_INVALID),

  cpf: string().required(REQUIRED_FIELD).matches(CPF_REGEX, CPF_INVALID),
});

export { EditProfileValidatorSchema };
