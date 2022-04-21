export const APP_TITLE = "AGRO RURAL";
export const ROOT_THEME = {
  palette: {
    primary: {
      light: "#63b8ff",
      main: "#539A5C",
      dark: "#173B1C",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#D9FFE6",
      light: "#E1F0E6",
      dark: "#869B8D",
      contrastText: "#000",
    },
  },
};
export const LOCAL_AUTH_PROVIDER = "local";

/* ROTAS DA API */
export const COLLECTION_FARMS = "farms";
export const COLLECTION_CATTLES = "cattles";
export const COLLECTION_DECLARATIONS = "declarations";
export const COLLECTION_USERS = "users";

/* MENSAGENS DE ERRO DO FORMULÁRIO */
export const EMAIL_INVALID = "Digite um email válido";
export const PASSWORD_MIN_8 = "A senha deve conter no mínimo 8 caracteres";
export const PASSWORD_IS_NOT_EQUALS = "Ambas as senhas devem ser identicas";
export const REQUIRED_FIELD = "O campo é obrigatório";
export const CPF_INVALID = "Digite um cpf válido";
export const INDENTIFER_INVALID = "Digite um identificador válido";

/* REGEXS */
export const CPF_REGEX =
  /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
