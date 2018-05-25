import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import items from "./items";
import currentItem from "./currentItem";

export default combineReducers({
  items,
  currentItem,
  routing: routerReducer
});
