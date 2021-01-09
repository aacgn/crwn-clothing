import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchCollectionsFailure, fetchCollectionsSucess } from "./shop.actions";
import ShopActionTypes from "./shop.types";

import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";

function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap,
            snapshot
        );
        yield put(fetchCollectionsSucess(collectionsMap));
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message))
    }
}

function* fetchCollectionStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* shopSaga() {
    yield all([
        call(fetchCollectionStart)
    ])
}