import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQV32rnecJugG1a0yPiP9l5xFK8Fvf4t0",
  authDomain: "dominicango-885fc.firebaseapp.com",
  projectId: "dominicango-885fc",
  storageBucket: "dominicango-885fc.appspot.com",
  messagingSenderId: "172474685847",
  appId: "1:172474685847:web:f9cad769f4c19794bdccd2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };