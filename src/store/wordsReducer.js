const initialState = [];

const ADD_WORD = "ADD_WORD";

export function wordsReducer (state = initialState, action) {
  switch(action.type) {
    case ADD_WORD: 
      return addWord(state, action.payload);
    default: return state;  
  }
}

export const addWordsAction = (payload) => ({type: ADD_WORD, payload})

function addWord(state, payload) { 
 return [...state.filter(i => i.id !== payload.id), payload];
}


