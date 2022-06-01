import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { AiFillSound } from 'react-icons/ai';
import "../styles/show-card.css";
import Header from './Header';
import Games from './games/Games';

import { speech } from '../hooks/speech';

const ShowCard = () => {

  const params = useParams();
  const name = params.card_name;

  const [cards] = useState(JSON.parse(localStorage.getItem(name)));
  const [counter, setCouter] = useState(0);
  
  function isFlippedCardToggle(e) {
    if(e.target.className === "flip-card-front" || e.target.className === "flip-card-back")
    e.currentTarget.classList.toggle("is-flipped");
  }

  function goToTheNextCard() {
    setCouter(counter + 1);
    if(counter === cards.length - 1) {
      setCouter(0);
    }
  }
 
  function goToThePrevCard() {
    setCouter(counter - 1);
    if(counter === 0) {
      setCouter(cards.length - 1);
    }
  }

  return (
    <>
      <Header />
      <div className="cards-content">
        <div className="cards-container">
          <div className="flip-card">
            <div onClick={isFlippedCardToggle} className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-word">{cards[counter].word}</div>
                <AiFillSound onClick={() => speech(cards[counter].word)} className="sound" />
              </div>
              <div className="flip-card-back">
                <div className="card-word_translate">{cards[counter].wordTranslate}</div>
                <div className="card-word_phrase">{cards[counter].phrase}</div>
                <AiFillSound onClick={() => speech(cards[counter].phrase)} className="sound" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cards-control">
        <HiArrowNarrowLeft className="arrow" onClick={goToThePrevCard} />
        <div className="cards-counter">{counter + 1} / {cards.length}</div>
        <HiArrowNarrowRight className="arrow" onClick={goToTheNextCard} />
      </div>
      <Games setName={name} />
    </>
  );
}

export default ShowCard;
