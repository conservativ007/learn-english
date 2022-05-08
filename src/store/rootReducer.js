import { combineReducers, legacy_createStore } from "redux";
import { wordsReducer } from "./wordsReducer";

export const store = legacy_createStore(combineReducers({
  wordsReducer,
}));