import { correctAction, incorrectAction } from "../store/answersReducer";
import { userAnswerAction } from "../store/answersReducer";

export function checkUserAnswer(
  trueAnswer, 
  userAnswer, 
  marker, 
  dispatch,
  setInputAnswer, 
  ) {
  if(trueAnswer === userAnswer) {
    marker.current.classList.add("green");
    dispatch(correctAction());
  } else {
    marker.current.classList.add("red");
    dispatch(incorrectAction());
  }

  dispatch(userAnswerAction({
    isTrueAnswer: userAnswer === trueAnswer, // true or false
    userAnswer: userAnswer,
    trueAnswer: trueAnswer,
  }));

  let timer = setTimeout(() => {
    if(marker.current === null) return;
    console.log(marker)
    marker.current.className = "marker";
    setInputAnswer("");
  }, 1000);
  return () => clearTimeout(timer);
}