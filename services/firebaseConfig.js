import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Configurações do Firebase usando variáveis de ambiente (compatível com Expo SDK 49+)
const firebaseConfig = {
  apiKey: Constants?.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants?.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants?.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants?.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants?.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants?.expoConfig?.extra?.FIREBASE_APP_ID,
  measurementId: Constants?.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID,
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth com persistência no AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Exports
export { auth };
export const firestore = getFirestore(app);
export default app;
