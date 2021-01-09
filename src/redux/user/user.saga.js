import { all, call, put, takeLatest } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions';

function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try{
        const userRef = yield call(
            createUserProfileDocument, 
            userAuth,
            additionalData
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

function* signUp({ payload: { email, password, displayName} }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName }}))
    } catch(err) {
        yield put(signUpFailure(err.message))
    }
}

function* onSignUpStart() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        signUp
    )
}

function* signInAfterSignUp({ payload: { user, additionalData }}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

function* onSignUpSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUp
    )
}

export function* userSaga() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}