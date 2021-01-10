import UserActionTypes from './user.types';

export function signUpStart(userCredentials) {
    return {
        type: UserActionTypes.SIGN_UP_START,
        payload: userCredentials
    }
}

export function signUpSuccess({ user, additionalData }) {
    return {
        type: UserActionTypes.SIGN_UP_SUCCESS,
        payload: {
            user,
            additionalData
        }
    };
}

export function signUpFailure(errMessage) {
    return {
        type: UserActionTypes.SIGN_UP_FAILURE,
        payload: errMessage
    }
}

export function emailSignInStart(emailAndPassword) {
    return {
        type: UserActionTypes.EMAIL_SIGN_IN_START,
        payload: emailAndPassword
    };
}

export function googleSignInStart() {
    return {
        type: UserActionTypes.GOOGLE_SIGN_IN_START
    };
}

export function signInSuccess(user) {
    return {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: user
    };
}

export function signInFailure(errMessage) {
    return {
        type: UserActionTypes.SIGN_IN_FAILURE,
        payload: errMessage
    }
}

export function checkUserSession() {
    return {
        type: UserActionTypes.CHECK_USER_SESSION
    }
}

export function signOutStart() {
    return {
        type: UserActionTypes.SIGN_OUT_START
    };
}

export function signOutSuccess() {
    return {
        type: UserActionTypes.SIGN_OUT_SUCCESS
    };
}

export function signOutFailure(errMessage) {
    return {
        type: UserActionTypes.SIGN_OUT_FAILURE,
        payload: errMessage
    }
}