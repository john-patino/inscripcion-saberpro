// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAYbVoj18UDBEnTqBuXNFREDFH8yqIOiU",
  authDomain: "inscripciones-saberpro.firebaseapp.com",
  projectId: "inscripciones-saberpro",
  storageBucket: "inscripciones-saberpro.firebasestorage.app",
  messagingSenderId: "84241896857",
  appId: "1:84241896857:web:59f44e2d84c2ec87162f08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Exportar instancia de autenticación
//export const auth = getAuth(app);
