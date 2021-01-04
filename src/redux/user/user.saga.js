import { all, call, put, takeLatest } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess } from './user.actions';

function* getSnapshotFromUserAuth(userAuth) {
    try{
        const userRef = yield call(
            createUserProfileDocument, 
            userAuth
        );
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch(err) {
        yield put(signInFailure(err.message));
    }
}

function* signInWithGoogle() {
    try {
        const { user } =  yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(err) {
        yield put(signInFailure(err.message));
    }
}


function* onGoogleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    );
}

function* SingInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(err) {
        yield put(signInFailure(err.message))
    }
}

function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        SingInWithEmail
    );
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch(err) {
        yield put(signInFailure(err))
    }
}

function* onCheckUserSession() {
    yield takeLatest(
        UserActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    )
}

function* signOut() {
    try {
        yield auth.signOut();
        
        yield put(signOutSuccess())
    } catch(err) {
        yield put(signOutFailure(err.message))
    }
}

function* onSignOutStart() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOut
    )
}

export function* userSaga() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart)
    ])
}