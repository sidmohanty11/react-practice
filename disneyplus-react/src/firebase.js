import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAQsZa1zpIVnX3oyW6kz5kN7aTIm_uBnWU",
    authDomain: "react-http-8d73b.firebaseapp.com",
    databaseURL: "https://react-http-8d73b-default-rtdb.firebaseio.com",
    projectId: "react-http-8d73b",
    storageBucket: "react-http-8d73b.appspot.com",
    messagingSenderId: "398276918994",
    appId: "1:398276918994:web:764e7179fdb5b59e00b70b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;