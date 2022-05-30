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
export const COLLECTION_VACINES = "vacines";
export const COLLECTION_REPORTS = "reports";
export const COLLECTION_NOTIFICATIONS = "notifications";
export const MALE = 1;
export const FEMALE = 2;
export const DEATH_BY_VARIOUS_CASES = 1;
export const DEATH_BY_OWN_CONSUMPTION = 2;
export const CATTLE_IS_LIVE = "O gado esta vivo";
//  VACINAS  DOS ANIMAIS
export const FEBRE_AFTOSA = "Febre aftosa";
export const RAIVA = "Raiva";
export const BRUCELOSE = "Brucelose";

/* MENSAGENS DE ERRO DO FORMULÁRIO */
export const EMAIL_INVALID = "Digite um email válido";
export const PASSWORD_MIN_8 = "A senha deve conter no mínimo 8 caracteres";
export const PASSWORD_IS_NOT_EQUALS = "Ambas as senhas devem ser identicas";
export const REQUIRED_FIELD = "O campo é obrigatório";
export const CPF_INVALID = "Digite um cpf válido";
export const INDENTIFER_INVALID = "Digite um identificador válido";
export const PHONE_MIN_9_11 = "Numero de telefone deve possuir 11 digitos";
export const INDENTIFIER_MIN_1 = "O identificador deve ser maior que 0";
export const QTDY_CHILDREN_MIN_0 =
  "A quantidade de crias deve ser entre 0 e 15";
export const QTDY_CHILDREN_MAX_15 =
  "A quantidade de crias deve ser entre 0 a 15";
export const QTDY_WEIGHT_MAX_1200 = "Peso do gado deve ser inferior a 1200kg";
export const TODAY_DATE = "A data não pode ser superior ao dia de atual";
export const INFERIOR_DATE_2005 = "O ano não pode ser menor que 2005";
/* REGEXS */

export const PHONE_REGEX =
  // MAIS CERTO QUE TEM
  // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
// ERRADO
// /^(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

// /(?\d{2,}\)?[ -]?\d{4,}[\-\s]?\d{4}$/;
export const PHONE_INVALID = "numero de telefone inválido";

export const CPF_REGEX =
  /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
// /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
// /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
/* MENSAGENS DE ERRO */
export const INTERNAL_ERROR =
  "Ops! Ocorreu um erro inesperado, por favor tente mais tarde.";

export const FIREAUTH_ERROR_CODES_MAP: { [key: string]: string } = {
  "auth/app-deleted": "O banco de dados não foi localizado.",
  "auth/expired-action-code": "O código da ação o ou link expirou.",
  "auth/invalid-action-code":
    "O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.",
  "auth/user-disabled":
    "O usuário correspondente à credencial fornecida foi desativado.",
  "auth/user-not-found": "O e-mail ou senha estão inválidos ou não existe.",
  "auth/weak-password": "A senha é muito fraca.",
  "auth/email-already-in-use":
    "Já existi uma conta com o endereço de e-mail fornecido.",
  "auth/invalid-email": "O endereço de e-mail não é válido.",
  "auth/operation-not-allowed":
    "O tipo de conta correspondente à esta credencial, ainda não encontra-se ativada.",
  "auth/account-exists-with-different-credential":
    "E-mail já associado a outra conta.",
  "auth/auth-domain-config-required":
    "A configuração para autenticação não foi fornecida.",
  "auth/credential-already-in-use": "Já existe uma conta para esta credencial.",
  "auth/operation-not-supported-in-this-environment":
    "Esta operação não é suportada no ambiente que está sendo executada. Verifique se deve ser http ou https.",
  "auth/timeout":
    "Excedido o tempo de resposta. O domínio pode não estar autorizado para realizar operações.",
  "auth/missing-android-pkg-name":
    "Deve ser fornecido um nome de pacote para instalação do aplicativo Android.",
  "auth/missing-continue-uri":
    "A próxima URL deve ser fornecida na solicitação.",
  "auth/missing-ios-bundle-id":
    "Deve ser fornecido um nome de pacote para instalação do aplicativo iOS.",
  "auth/invalid-continue-uri":
    "A próxima URL fornecida na solicitação é inválida.",
  "auth/unauthorized-continue-uri":
    "O domínio da próxima URL não está na lista de autorizações.",
  "auth/invalid-dynamic-link-domain":
    "O domínio de link dinâmico fornecido, não está autorizado ou configurado no projeto atual.",
  "auth/argument-error": "Verifique a configuração de link para o aplicativo.",
  "auth/invalid-persistence-type":
    "O tipo especificado para a persistência dos dados é inválido.",
  "auth/unsupported-persistence-type":
    "O ambiente atual não suportar o tipo especificado para persistência dos dados.",
  "auth/invalid-credential": "A credencial expirou ou está mal formada.",
  "auth/wrong-password": "O e-mail ou senha estão inválidos ou não existe.",
  "auth/invalid-verification-code":
    "O código de verificação da credencial não é válido.",
  "auth/invalid-verification-id":
    "O ID de verificação da credencial não é válido.",
  "auth/custom-token-mismatch": "O token está diferente do padrão solicitado.",
  "auth/invalid-custom-token": "O token fornecido não é válido.",

  // 'auth/invalid-email': 'O endereço de e-mail não é válido.',

  "auth/captcha-check-failed":
    "O token de resposta do reCAPTCHA não é válido, expirou ou o domínio não é permitido.",
  "auth/invalid-phone-number":
    "O número de telefone está em um formato inválido (padrão E.164).",
  "auth/missing-phone-number": "O número de telefone é requerido.",
  "auth/quota-exceeded": "A cota de SMS foi excedida.",
  "auth/cancelled-popup-request":
    "Somente uma solicitação de janela pop-up é permitida de uma só vez.",
  "auth/popup-blocked": "A janela pop-up foi bloqueado pelo navegador.",
  "auth/popup-closed-by-user":
    "A janela pop-up foi fechada pelo usuário sem concluir o login no provedor.",
  "auth/unauthorized-domain":
    "O domínio do aplicativo não está autorizado para realizar operações.",
  "auth/invalid-user-token": "O usuário atual não foi identificado.",
  "auth/user-token-expired": "O token do usuário atual expirou.",
  "auth/null-user": "O usuário atual é nulo.",
  "auth/app-not-authorized":
    "Aplicação não autorizada para autenticar com a chave informada.",
  "auth/invalid-api-key": "A chave da API fornecida é inválida.",
  "auth/network-request-failed": "Falha de conexão com a rede.",
  "auth/requires-recent-login":
    "O último horário de acesso do usuário não atende ao limite de segurança.",
  "auth/too-many-requests":
    "As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.",
  "auth/web-storage-unsupported":
    "O navegador não suporta armazenamento ou se o usuário desativou este recurso.",
  "auth/invalid-claims":
    "Os atributos de cadastro personalizado são inválidos.",
  "auth/claims-too-large":
    "O tamanho da requisição excede o tamanho máximo permitido de 1 Megabyte.",
  "auth/id-token-expired": "O token informado expirou.",
  "auth/id-token-revoked": "O token informado perdeu a validade.",
  "auth/invalid-argument": "Um argumento inválido foi fornecido a um método.",
  "auth/invalid-creation-time":
    "O horário da criação precisa ser uma data UTC válida.",
  "auth/invalid-disabled-field":
    "A propriedade para usuário desabilitado é inválida.",
  "auth/invalid-display-name": "O nome do usuário é inválido.",
  "auth/invalid-email-verified": "O e-mail é inválido.",
  "auth/invalid-hash-algorithm":
    "O algoritmo de HASH não é uma criptografia compatível.",
  "auth/invalid-hash-block-size": "O tamanho do bloco de HASH não é válido.",
  "auth/invalid-hash-derived-key-length":
    "O tamanho da chave derivada do HASH não é válido.",
  "auth/invalid-hash-key":
    "A chave de HASH precisa ter um buffer de byte válido.",
  "auth/invalid-hash-memory-cost": "O custo da memória HASH não é válido.",
  "auth/invalid-hash-parallelization":
    "O carregamento em paralelo do HASH não é válido.",
  "auth/invalid-hash-rounds": "O arredondamento de HASH não é válido.",
  "auth/invalid-hash-salt-separator":
    "O campo do separador de SALT do algoritmo de geração de HASH precisa ser um buffer de byte válido.",
  "auth/invalid-id-token": "O código do token informado não é válido.",
  "auth/invalid-last-sign-in-time":
    "O último horário de login precisa ser uma data UTC válida.",
  "auth/invalid-page-token":
    "A próxima URL fornecida na solicitação é inválida.",
  "auth/invalid-password":
    "A senha é inválida, precisa ter pelo menos 6 caracteres.",
  "auth/invalid-password-hash": "O HASH da senha não é válida.",
  "auth/invalid-password-salt": "O SALT da senha não é válido.",
  "auth/invalid-photo-url": "A URL da foto de usuário é inválido.",
  "auth/invalid-provider-id": "O identificador de provedor não é compatível.",
  "auth/invalid-session-cookie-duration":
    "A duração do COOKIE da sessão precisa ser um número válido em milissegundos, entre 5 minutos e 2 semanas.",
  "auth/invalid-uid":
    "O identificador fornecido deve ter no máximo 128 caracteres.",
  "auth/invalid-user-import":
    "O registro do usuário a ser importado não é válido.",
  "auth/invalid-provider-data": "O provedor de dados não é válido.",
  "auth/maximum-user-count-exceeded":
    "O número máximo permitido de usuários a serem importados foi excedido.",
  "auth/missing-hash-algorithm":
    "É necessário fornecer o algoritmo de geração de HASH e seus parâmetros para importar usuários.",
  "auth/missing-uid": "Um identificador é necessário para a operação atual.",
  "auth/reserved-claims":
    "Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas.",
  "auth/session-cookie-revoked": "O COOKIE da sessão perdeu a validade.",
  "auth/uid-alread-exists": "O indentificador fornecido já está em uso.",
  "auth/email-already-exists": "O e-mail fornecido já está em uso.",
  "auth/phone-number-already-exists": "O telefone fornecido já está em uso.",
  "auth/project-not-found": "Nenhum projeto foi encontrado.",
  "auth/insufficient-permission":
    "A credencial utilizada não tem permissão para acessar o recurso solicitado.",
  "auth/internal-error":
    "O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.",
};
export const USUARIO_CADASTRADO_COM_SUCESSO = "Cadastro realizado com sucesso!";
export const LOGIN_REALIZADO_COM_SUCESSO = "Login realizado com sucesso!";
export const EMAIL_REDIFINIR_ENVIADO_COM_SUCESSO =
  "E-mail para redefinir a senha foi enviado com suceso, por favor verifique sua caixa de spams!";

export const ATUH_INTERNAL_ERROR =
  "Ocorreu um erro interno ao carregar informações do usuário.";

export const DISABLED_USER =
  "Usuário desativado, por favor contacte o administrador do sistema para reativação";
export const NOT_FOUND_USER =
  "Usuário não identificado com credênciais do google";

export const GLOBAL_LOADING_KEY = "global";
