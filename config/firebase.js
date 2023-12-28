// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm8tY9t5XNQ2hf-EGvIm1S0QJbNOjRZQk",
  authDomain: "rn-paper-store.firebaseapp.com",
  projectId: "rn-paper-store",
  storageBucket: "rn-paper-store.appspot.com",
  messagingSenderId: "490604024450",
  appId: "1:490604024450:web:888dbe21ed95abcbb3da9b",
  measurementId: "G-TQMG18PDTQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export Firestore and Auth instances
export const db = getFirestore(app);
export { auth }; // Export the initialized auth instance

// Export the initialized app (optional)
export default app;
