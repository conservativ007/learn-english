import { combineReducers, legacy_createStore } from "redux";
import { wordsReducer } from "./wordsReducer";
import { setNameReducer } from "./setNameReducer";

export const store = legacy_createStore(combineReducers({
  wordsReducer,
  setNameReducer
}));