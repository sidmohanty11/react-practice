import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC6dcSO_SdwN-a2UEZbzZrEWDYlxacrxmc",
    authDomain: "react-http-742be.firebaseapp.com",
    projectId: "react-http-742be",
    storageBucket: "react-http-742be.appspot.com",
    messagingSenderId: "78204305336",
    appId: "1:78204305336:web:284ca2ce31e948dac1594d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;