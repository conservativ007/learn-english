const ADD_COUNTER = "ADD_COUNTER";
const ZEROING = "ZEROING";

export function counterReducer(counter = 0, action) {
  switch(action.type) {
    case ADD_COUNTER:
      return counter + 1;
    case ZEROING:
      return counter = 0;
    default: return counter;
  }
}

export const addCounterAction = () => ({type: ADD_COUNTER});
export const zeroingCounterAction = () => ({type: ZEROING});