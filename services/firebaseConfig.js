import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configurações do Firebase fornecidas pelo usuário
const firebaseConfig = {
  apiKey: "AIzaSyBdCICQLChnG2Fmxjmrp27KJaIp5RV5ItE",
  authDomain: "expostore-8dfee.firebaseapp.com",
  projectId: "expostore-8dfee",
  storageBucket: "expostore-8dfee.firebasestorage.app",
  messagingSenderId: "479090574608",
  appId: "1:479090574608:web:61ac162a49fc4ef7535195",
  measurementId: "G-8VZYJYVPC4"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
