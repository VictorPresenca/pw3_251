import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDzQiMZw6e78yFa1IBu_VKI2AJKtxEDnKg",
    authDomain: "projetoetec2025-70e51.firebaseapp.com",
    projectId: "projetoetec2025-70e51",
    storageBucket: "projetoetec2025-70e51.firebasestorage.app",
    messagingSenderId: "21244575126",
    appId: "1:21244575126:web:409babb1c98bdcdce771b7"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
