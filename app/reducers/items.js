import { itemsActions as actionTypes } from "../actions/actionTypes";

let initialState = {
  itemsHasErrored: false,
  itemsIsLoading: false,
  data: []
};

export default function items(state = {} , action) {
  state = initialState;
  switch (action.type) {
    case actionTypes.ITEMS_HAS_ERRORED:
      return Object.assign({}, state, { itemsHasErrored: true, error: action.error });
    case actionTypes.ITEMS_IS_LOADING:
      return Object.assign({}, state, { itemsIsLoading: action.isLoading });
    case actionTypes.ITEMS_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, { itemsIsLoading: action.isLoading, data:action.items });
    default:
      return state;
  }
}
