import { correctAction, incorrectAction } from "../store/answersReducer";
import { userAnswerAction } from "../store/answersReducer";

export function checkUserAnswer(
  trueAnswer, 
  question,
  userAnswer, 
  marker, 
  DOMElemTrueAnswer,
  dispatch,
  setInputAnswer, 
  bool = false,
  setCounter
  ) {

  if(bool === false) {
    setFalseAnswer(DOMElemTrueAnswer, trueAnswer, setInputAnswer, trueAnswer)
  } 

  if(trueAnswer === userAnswer) {
    marker.current.classList.add("green");
    dispatch(correctAction());
  } else {
    marker.current.classList.add("red");
    dispatch(incorrectAction());
  }

  dispatch(userAnswerAction({
    isTrueAnswer: userAnswer === trueAnswer, // true or false
    userAnswer: bool === true ? userAnswer : "не знаю",
    trueAnswer: trueAnswer,
    question: String(question).trim()
  }));

  let timer = setTimeout(() => {
    if(marker.current === null) return;
    marker.current.className = "marker";
    setInputAnswer("");
    setCounter(counter => counter + 1);
  }, 1000);
  return () => clearTimeout(timer);
}


function setFalseAnswer(DOMElemTrueAnswer, trueAnswer, setInputAnswer) {
  if(DOMElemTrueAnswer) {
    DOMElemTrueAnswer.current.innerHTML = trueAnswer;
    setInputAnswer("");
    setTimeout(() => {
      DOMElemTrueAnswer.current.innerHTML = "";
    }, 1000);
  }
}