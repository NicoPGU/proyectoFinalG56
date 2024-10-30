import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjMnL69HB8568adQQZtIXKWnYwo5-7ohA",
  authDomain: "sucasa-dba34.firebaseapp.com",
  projectId: "sucasa-dba34",
  storageBucket: "sucasa-dba34.appspot.com",
  messagingSenderId: "292014290952",
  appId: "1:292014290952:web:1699ae85be10fbaad539bd"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);

export { storage };
