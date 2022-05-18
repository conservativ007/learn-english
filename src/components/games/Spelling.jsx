import React, {useRef, useState} from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router';

import "../../styles/games/spelling.css"

const Spelling = () => {

  const params = useParams();
  const setName = params.card_name;

  const [cards] = useState(JSON.parse(localStorage.getItem(setName)));
  let [counter, setCounter] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");

  const marker = useRef(null);

  function checkAnswer() {
    console.log(cards)
    let tryAnswer = cards[counter].word;
    if(inputAnswer === tryAnswer) {
      marker.current.classList.add("green");
      // console.log("ooooo yeah")
      // console.log(marker.current)
    } else {
      marker.current.classList.add("red");
    }

    setCounter(counter += 1);
  }
  
  

  return (
    <div className="game-container">
      <div className="word-translate">{cards[counter].wordTranslate.join(", ")}</div>
      <div className="user-answer">
        <FormControl
          placeholder="введите перевод на английском"
          value={inputAnswer}
          onChange={e => setInputAnswer(e.target.value)}
        />
        <div ref={marker} className="marker"></div>
      </div>
      <div className="check-answer">
        <Button onClick={() => checkAnswer()}>Ответ</Button>
        <Button>да хуй его знает</Button>
      </div>
      
    </div>
  );
}

export default Spelling;
