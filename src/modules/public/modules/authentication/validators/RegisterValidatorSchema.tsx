import { object, ref, string } from "yup";
import {
  CPF_INVALID,
  CPF_REGEX,
  EMAIL_INVALID,
  PASSWORD_IS_NOT_EQUALS,
  PASSWORD_MIN_8,
  PHONE_INVALID,
  PHONE_REGEX,
  REQUIRED_FIELD,
} from "../../../../../constants";
function isValidCPF(cpf: any) {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/gim, "");
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    return false;
  }
  var soma = 0;
  var resto;
  for (var i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (var i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

const RegisterValidatorSchema = object({
  email: string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
  farmName: string().required(REQUIRED_FIELD),
  name: string().required(REQUIRED_FIELD),
  phone: string().required(REQUIRED_FIELD).matches(PHONE_REGEX, PHONE_INVALID),
  cpf: string()
    .required(REQUIRED_FIELD)
    .test("test-invalid cpf", CPF_INVALID, (cpf) => isValidCPF(cpf))
    .matches(CPF_REGEX, CPF_INVALID),

  password: string().min(8, PASSWORD_MIN_8).required(REQUIRED_FIELD),
  passwordConfirm: string()
    .required(REQUIRED_FIELD)
    .oneOf([ref("password")], PASSWORD_IS_NOT_EQUALS),
});

export { RegisterValidatorSchema };
