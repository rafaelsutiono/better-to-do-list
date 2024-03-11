import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBtFS9axBIGSps9fcAFe6TYI2ZgUTL2MKs",
    authDomain: "fir-auth-299ba.firebaseapp.com",
    projectId: "fir-auth-299ba",
    storageBucket: "fir-auth-299ba.appspot.com",
    messagingSenderId: "870398408551",
    appId: "1:870398408551:web:862b136a24e659a411e1c2",
    measurementId: "G-1HTL8HHNRN"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const sg = getStorage(app)