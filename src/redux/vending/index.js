import vendingReducer from "./vending.reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  vending: vendingReducer,
});

export default reducers;
