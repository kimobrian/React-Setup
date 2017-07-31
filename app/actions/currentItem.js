import { itemActions as actionTypes } from '../actions/actionTypes'
import axios from 'axios';

export function itemHasErrored(status, err) {
    return {
        type: actionTypes.ITEM_HAS_ERRORED,
        error: err,
        isLoading: false
    };
}

export function itemIsLoading(loadStatus) {
    return {
        type: actionTypes.ITEM_IS_LOADING,
        isLoading: loadStatus,
        error: false
    };
}

export function itemFetchDataSuccess(items) {
    return {
        type: actionTypes.ITEM_FETCH_DATA_SUCCESS,
        items,
        isLoading: false
    };
}

export function itemFetchData(url) {
    return (dispatch) => {
        dispatch(itemIsLoading(true));
        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    dispatch(itemHasErrored(true, "Error Occurred: "+response.statusText));
                }
                dispatch(itemIsLoading(false));
                return response;
            })
            .then((items) => {
                dispatch(itemFetchDataSuccess(items.data))
            })
            .catch((err) => {
                dispatch(itemHasErrored(err));
            });
    };
}
