import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOUiXlKNr21ch3SniyUlAshE6DMcNwXRA",
  authDomain: "react-client-b7d34.firebaseapp.com",
  projectId: "react-client-b7d34",
  storageBucket: "react-client-b7d34.appspot.com",
  messagingSenderId: "140795168179",
  appId: "1:140795168179:web:8a9663a46b74ea732cf7c6",
  measurementId: "G-R1NRKZS6VL"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);