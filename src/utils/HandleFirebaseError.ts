import { FIREAUTH_ERROR_CODES_MAP, INTERNAL_ERROR } from "../constants";

/**
 * Método responsável por retornar a mensagem de erro
 * de acordo com o erro do firebase;
 *
 * @param err - Erro retornado pelo firebase;
 * @returns Caso a mensagem esteja mapeado com o código retornado do
 *          firebase é retornado a mensagem indicativa de acordo com
 *          alista @see {@link FIREAUTH_ERROR_CODES_MAP}, caso
 *          contrário é retornado @see {@link INTERNAL_ERROR};
 */
export const getFireError = (err: { code?: string } | string) => {
  let message;
  if (typeof err === "string") {
    message = err;
  } else if (err.code) {
    message = FIREAUTH_ERROR_CODES_MAP[err.code];
  }
  return message || INTERNAL_ERROR;
};
