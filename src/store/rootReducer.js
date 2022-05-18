import { combineReducers, legacy_createStore } from "redux";
import { wordsReducer } from "./wordsReducer";
import { setNameReducer } from "./setNameReducer";
import { answersReducer } from "./answersReducer";

export const store = legacy_createStore(combineReducers({
  wordsReducer,
  setNameReducer,
  answersReducer
}));