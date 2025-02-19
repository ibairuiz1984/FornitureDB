import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Importación correcta

const firebaseConfig = {
  apiKey: "AIzaSyC5Pstcie7IIeA_KpOW4ke3y3tRxP1b6AA",
  authDomain: "fornituredb-da8d6.firebaseapp.com",
  projectId: "fornituredb-da8d6",
  storageBucket: "fornituredb-da8d6.appspot.com",
  messagingSenderId: "871756267224",
  appId: "1:871756267224:web:db86134d2990515a8521ad"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ Asegúrate de inicializarlo después de app

export { db, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc, updateDoc, auth };
