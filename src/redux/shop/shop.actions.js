import ShopActionTypes from './shop.types';

import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSucess = collectionsMaps => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMaps
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');

        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            const collectionsMaps = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSucess(collectionsMaps));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}