const initialState = [];

const ADD_WORLD = "ADD_WORLD";

export function wordsReducer (state = initialState, action) {
  switch(action.type) {
    case ADD_WORLD: 
      return [...state, action.payload];
    default: return state;  
  }
}

export const addWordsAction = (payload) => ({type: ADD_WORLD, payload})

