import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
  apiKey: "AIzaSyDyV-SQkqivh1bt5rlH5yj77VCDmGaN7Yo",
  authDomain: "the-instagram.firebaseapp.com",
  projectId: "the-instagram",
  storageBucket: "the-instagram.appspot.com",
  messagingSenderId: "1044837610129",
  appId: "1:1044837610129:web:5cdf2f775936061cf2c530",
  measurementId: "G-E5ZBTTQJPM",
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };