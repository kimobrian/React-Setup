import { itemActions as actionTypes } from "../actions/actionTypes";

let initialState = {
  itemHasErrored: false,
  itemIsLoading: false,
  data: []
};

export default function items(state = {} , action) {
  state = initialState;
  switch (action.type) {
    case actionTypes.ITEM_HAS_ERRORED:
      return Object.assign({}, state, { itemHasErrored: true, error: action.error });
    case actionTypes.ITEM_IS_LOADING:
      return Object.assign({}, state, { itemIsLoading: action.isLoading });
    case actionTypes.ITEM_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, { itemIsLoading: action.isLoading, data:action.items });
    default:
      return state;
  }
}
