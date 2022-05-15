import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, ReactNode, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getFireError } from "utils/HandleFirebaseError";
import { auth, firestore } from "../configs/Firebase";
import {
  ATUH_INTERNAL_ERROR,
  COLLECTION_FARMS,
  COLLECTION_USERS,
  DISABLED_USER,
  LOCAL_AUTH_PROVIDER,
  NOT_FOUND_USER,
  USUARIO_CADASTRADO_COM_SUCESSO,
} from "../constants";
import {
  PerfilModelUser,
  RegisterUserModel,
  UserModel,
} from "../modules/public/models/UserModel";
import { useGlobalLoading } from "./GlobalLoadingProvider";

type AuthContext = {
  userState: UserModel | undefined;
  getUser: () => Promise<UserModel | undefined>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (formData: RegisterUserModel) => Promise<void>;

  logout: (redirectToHome?: boolean) => void;
  desactiverUser: () => Promise<void>;
  // sendPasswordReset: (email: string) => {};
  // loadUserDataById: (uid: string) => Promise<UserModel | undefined>;
  loadUserDataById: (uid: string) => Promise<UserModel | undefined>;
  sendPasswordReset: (email: string) => Promise<void>;
};

const UserAuthProvider = (): AuthContext => {
  const [user, setUser] = useState<UserModel>();
  const navigate = useNavigate();

  /**
   * Método responsável por realizar login no fireauth;
   *
   * @param email - Email do usuário;
   * @param password - Senha do usuário;
   */
  const signIn = async (email: string, password: string) => {
    // const loadingHelper = useGlobalLoading();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await loadUserDataById(res.user.uid);
    } catch (err: any) {
      toast.error(getFireError(err));

      if (await isLoggedIn()) {
        logout(false);
      }
      throw err;
    }
  };

  /**
   * Método responsável por realizar o cadastor do fireauth e firestore;
   *
   * @param formData - @see {@link RegisterUserModel} dados do usuário;
   */
  const signUp = async (formData: RegisterUserModel) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = res.user;
      await registerUser(user.uid, formData);
      toast.success(USUARIO_CADASTRADO_COM_SUCESSO);
    } catch (err: any) {
      toast.error(getFireError(err));
      throw err;
    }
  };

  const logout = (redirectToHome = true) => {
    if (redirectToHome) {
      navigate("home");
    }
    return signOut(auth);
  };

  /**
   * Método responsável por realizar a chamada de redifinição de senha do usuário
   */
  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      toast.error(getFireError(err));
      throw err;
    }
  };

  /**
   * Busca dados do usuário a partir do uid de autenticação do FireAuthentication;
   *
   * Caso o usuário exista na coleção de usuários da aplicação, o state de usuário
   * será atualizado com os dados salvos no documento.
   *
   * Caso contrário uma mensagem de erro é retornado;
   *
   * @param uid - Identificador do usuário no fire Authentication;
   */

  // const getUserId = async (uid: string) => {
  //   const userDocRef = doc(firestore, COLLECTION_USERS, uid);
  //   const userData = await getDoc(userDocRef);
  //   if (!userData.exists()) {
  //     throw NOT_FOUND_USER;
  //   }
  // };
  const loadUserDataById = async (uid: string) => {
    const userDocRef = doc(firestore, COLLECTION_USERS, uid);
    const userData = await getDoc(userDocRef);
    if (!userData.exists()) {
      throw NOT_FOUND_USER;
    }

    //Salva os dados do usuário encontrado na coleção COLLECTION_USERS
    const user = { id: userData.id, ...userData.data() } as UserModel;
    //Caso o usuário não esteja ativo, é retornado um erro;
    if (!user.active) {
      logout(false);
      throw DISABLED_USER;
    }
    setUser(user);
    return user;
  };

  /**
   * Método responsável por realizar o cadastro do usuário
   * juntamente com as informações iniciais da fazenda e permissões;
   *
   * @param uid - Identificador do usuário no fire Authentication;
   * @param formData - @see {@link RegisterUserModel}
   */
  const registerUser = async (uid: string, formData: RegisterUserModel) => {
    // Criação do documento do usuário dentro da collection de user com o um id customizado
    // Nesse caso é utilziado o uid;
    const userRef = doc(firestore, COLLECTION_USERS, uid);
    // Busca o usuário com a mesma referência de criação que é utilizado acima
    const userDoc = await getDoc(userRef);
    // Caso exista informações no doc encontrado, é retornado uma mensagem de erro informado que o usuário já está cadastrado;
    if (userDoc.exists()) {
      throw "Usuário já cadastrado";
    }
    // Criação da fazenda com o nome fornecido
    const farmRef = await addDoc(collection(firestore, COLLECTION_FARMS), {
      name: formData.farmName,
      createdAt: Timestamp.now(),
      owner: userRef,
    });

    // Criação do usuário na coleção de usuários
    await setDoc(userRef, {
      uid,
      name: formData.name,
      phone: formData.phone,
      cpf: formData.cpf,
      authProvider: LOCAL_AUTH_PROVIDER,
      farmRef,
      createdAt: Timestamp.now(),
      active: true,
    });

    return userRef;
  };

  const isLoggedIn = async () => {
    const user = await getUser();
    return !!user;
  };

  const getUser = async (): Promise<UserModel> => {
    if (user) {
      return user;
    }
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          if (user) {
            loadUserDataById(user.uid).then(resolve).catch(reject);
          } else {
            unsubscribe();
            reject(ATUH_INTERNAL_ERROR);
          }
        },
        (err: any) => {
          reject(err);
          toast.error(getFireError(err));
          unsubscribe();
        }
      );
    });
  };

  const desactiverUser = async () => {
    const user = await getUser();
    const userRef = doc(firestore, COLLECTION_USERS, user.id);

    await updateDoc(userRef, { active: false });
  };

  return {
    userState: user,
    getUser,
    signIn,
    signUp,
    logout,
    sendPasswordReset,
    desactiverUser,
    loadUserDataById,
  };
};

const authContext = createContext<AuthContext | {}>({});

/**
 * Componente para entregar o contexto
 * de segurança para os componentes filhos
 */
const ProviderAuth = (props: { children: ReactNode }) => {
  const provider = UserAuthProvider();
  return (
    <authContext.Provider value={provider}>
      {props.children}
    </authContext.Provider>
  );
};

/** Método responsável por retornar o contexto atual  */
const useAuth = () => {
  return useContext(authContext) as AuthContext;
};

const updateUserId = async (uid: string, formData: PerfilModelUser) => {
  const userRef = doc(firestore, COLLECTION_USERS, uid);
  const userDoc = await getDoc(userRef);

  // return updateDoc(userRef, { ...formData });
  // AAAA

  if (userRef) {
    const userCollectionRef = collection(firestore, COLLECTION_USERS, uid);

    const userRef = await doc(firestore, userCollectionRef.path, uid);
    return updateDoc(userRef, { ...formData });
  }

  // return userRef;
};
// Apenas o acesso ao contexto e o provider
export { useAuth, ProviderAuth, updateUserId };
