const initialState = [];

const ADD_WORD = "ADD_WORD";
const ZEROING_WORDS = "ZEROING_WORDS";

export function wordsReducer (state = initialState, action) {
  switch(action.type) {
    case ADD_WORD: 
      return addWord(state, action.payload);
    case ZEROING_WORDS: 
      return [];
    default: return state;  
  }
}

export const addWordsAction = (payload) => ({type: ADD_WORD, payload});
export const addZeroingAction = () => ({type: ZEROING_WORDS});

function addWord(state, payload) { 
 return [...state.filter(i => i.id !== payload.id), payload];
}


