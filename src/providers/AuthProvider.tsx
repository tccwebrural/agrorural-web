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
} from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../configs/Firebase";
import {
  COLLECTION_FARMS,
  COLLECTION_USERS,
  LOCAL_AUTH_PROVIDER,
} from "../constants";
import { RegisterUserModel, UserModel } from "../models/UserModel";

type AuthContext = {
  userState: UserModel | undefined;
  getUser: () => Promise<UserModel | undefined>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (formData: RegisterUserModel) => Promise<void>;
  logout: (redirectToHome?: boolean) => void;
  sendPasswordReset: (email: string) => {};
};

const UserAuthProvider = (): AuthContext => {
  const [userAuth] = useAuthState(auth);
  const [user, setUser] = useState<UserModel>();
  const navigate = useNavigate();

  /**
   * Método responsável por realizar login no fireauth;
   *
   * @param email - Email do usuário;
   * @param password - Senha do usuário;
   */
  const signIn = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await loadUserDataById(res.user.uid);
    } catch (err) {
      console.error(err);
      if (await isLoggedIn()) {
        logout(false);
      }
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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
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
  const loadUserDataById = async (uid: string) => {
    const userDocRef = doc(firestore, COLLECTION_USERS, uid);
    const userData = await getDoc(userDocRef);
    if (!userData.exists()) {
      throw "Usuário não identificado com credênciais do google";
    }

    //Salva os dados do usuário encontrado na coleção COLLECTION_USERS
    setUser({ id: userData.id, ...userData.data() } as UserModel);
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
    });

    return userRef;
  };

  /*
   * Hook utilizado para analisar mudanças de estado do usuário logado;
   *
   * Quando o usuário realiza o logout os dados do state user serão apagados;
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadUserDataById(user.uid);
      } else {
        setUser(undefined);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const isLoggedIn = async () => {
    const user = await getUser();
    return !!user;
  };

  const getUser = async () => {
    if (!user && userAuth?.uid) {
      const uid = userAuth.uid;
      await loadUserDataById(uid);
    }

    return user;
  };

  return {
    userState: user,
    getUser,
    signIn,
    signUp,
    logout,
    sendPasswordReset,
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

// Apenas o acesso ao contexto e o provider
export { useAuth, ProviderAuth };
