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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const  { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        } 
    }

    return userRef;
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