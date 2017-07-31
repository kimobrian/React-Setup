import { itemsActions as actionTypes } from '../actions/actionTypes'
import axios from 'axios';

export function itemsHasErrored(status, err) {
    return {
        type: actionTypes.ITEMS_HAS_ERRORED,
        error: err,
        isLoading: false
    };
}

export function itemsIsLoading(loadStatus) {
    return {
        type: actionTypes.ITEMS_IS_LOADING,
        isLoading: loadStatus,
        error: false
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: actionTypes.ITEMS_FETCH_DATA_SUCCESS,
        items,
        isLoading: false
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    dispatch(itemsHasErrored(true, "Error Occurred: "+response.statusText));
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((items) => {
                dispatch(itemsFetchDataSuccess(items.data))
            })
            .catch((err) => {
                dispatch(itemsHasErrored(err));
            });
    };
}
