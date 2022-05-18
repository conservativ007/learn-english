let defaultStore = {
  correctAnswerCounter: 0,
  incorrectAnswerCounter: 0,
  userAnswer: []
}

const CORRECT = "CORRECT";
const INCORRECT = "INCORRECT";
const ADD_ANSWER = "ADD_ANSWER";


export function answersReducer(store = defaultStore, action) {
  switch(action.type) {
    case CORRECT:
      return {...store, correctAnswerCounter: store.correctAnswerCounter + 1}
    case INCORRECT:
      return {...store, incorrectAnswerCounter: store.incorrectAnswerCounter + 1}
    case ADD_ANSWER:
      return {...store, userAnswer: [...store.userAnswer, action.payload]}
    default: return store;
    }
}

export const correctAction = () => ({type: CORRECT})
export const incorrectAction = () => ({type: INCORRECT})
export const userAnswerAction = (payload) => ({type: ADD_ANSWER, payload})

