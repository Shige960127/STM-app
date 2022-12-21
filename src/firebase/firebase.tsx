import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import Constants from "expo-constants";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: Constants!.manifest!.extra!.FIREBASE_API_KEY,
  authDomain: Constants!.manifest!.extra!.FIREBASE_AUTH_DOMAIN,
  projectId: Constants!.manifest!.extra!.FIREBASE_PROJECT_ID,
  storageBucket: Constants!.manifest!.extra!.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants!.manifest!.extra!.FIREBASE_MESSAGE_SENDER_ID,
  appId: Constants!.manifest!.extra!.FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
export const db = getFirestore(app);
