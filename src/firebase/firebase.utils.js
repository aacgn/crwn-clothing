import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAC8Y1lKEolb0kuuiz705N-Ro9gh1VwqYA",
    authDomain: "crwn-db-a37d9.firebaseapp.com",
    databaseURL: "https://crwn-db-a37d9.firebaseio.com",
    projectId: "crwn-db-a37d9",
    storageBucket: "crwn-db-a37d9.appspot.com",
    messagingSenderId: "440043949480",
    appId: "1:440043949480:web:e2472f35218affcb94a19d"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt:  'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;