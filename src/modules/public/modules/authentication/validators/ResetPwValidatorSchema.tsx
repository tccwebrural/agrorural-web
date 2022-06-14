import { object, string } from "yup";
import { EMAIL_INVALID, REQUIRED_FIELD } from "../../../../../constants";

const ResetPwValidatorSchema = object({
  email: string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
});

export { ResetPwValidatorSchema };
