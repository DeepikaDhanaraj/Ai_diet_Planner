// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getReactNativePersistence, initializeAuth,getAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ,
  authDomain: "ai-diet1.firebaseapp.com",
  projectId: "ai-diet1",
  storageBucket: "ai-diet1.firebasestorage.app",
  messagingSenderId: ",
  appId: "",
  measurementId: 
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with AsyncStorage
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  // If auth is already initialized, get the existing instance
  auth = getAuth(app);
}
export { auth };
