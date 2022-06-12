import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence).then();
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     (email: string, password: string) => {
//       return signInWithEmailAndPassword(auth, email, password);
//     };
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

export { auth, firestore };
