const defaultStore = "default_name";
const SET_NAME = "SET_NAME";

export function setNameReducer(store = defaultStore, action) {
  if(action.type === SET_NAME) {
    return store = action.payload;
  }
  return store;
}

export const setNameAction = (payload) => ({type: SET_NAME, payload})