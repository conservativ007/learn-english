import { combineReducers, legacy_createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';

import { wordsReducer } from "./wordsReducer";
import { setNameReducer } from "./setNameReducer";
import { answersReducer } from "./answersReducer";

const rootReducer = combineReducers({
  wordsReducer,
  setNameReducer,
  answersReducer,
})

export const store = legacy_createStore(rootReducer, composeWithDevTools());

