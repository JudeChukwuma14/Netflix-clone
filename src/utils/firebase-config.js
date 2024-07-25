
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6Y0E-bhKuZ8jb0ZftRkxLobwoTA1tekc",
  authDomain: "netflix-98bc2.firebaseapp.com",
  projectId: "netflix-98bc2",
  storageBucket: "netflix-98bc2.appspot.com",
  messagingSenderId: "434856829447",
  appId: "1:434856829447:web:91ea0e440a7eef5dff00a2",
  measurementId: "G-ZHLS1W80LL",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
