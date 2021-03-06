import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Chooice from './test-components/Chooice';
import { getCards } from '../../functions/getCards';
import TrueOrFalse from './test-components/TrueOrFalse';
import ListeningComponent from './test-components/ListeningComponent';
import Header from '../Header';

const Test = () => {
  const params = useParams();
  const [cards] = useState(getCards(params));
  const questionsDom = useRef(null);

  const [endGame, setEndGame] = useState(false);

  function getUserAnswers() {
    let domElems = questionsDom.current;
    let foundElems = domElems.querySelectorAll(".active");

    let userAnswers = [...foundElems].map(item => {
      if(item.dataset.userTrueid === item.dataset.userAnswerid) return true;
      return false;
    })

    let elems = [...questionsDom.current.querySelectorAll(".choice-container")];
    elems.forEach((item, index) => {
      let div = document.createElement("div");
      
      if(userAnswers[index] === true) {
        div.className = "user-answer_true";
        div.innerHTML = "true";
        return item.appendChild(div);
      }
      div.className = "user-answer_false";
      div.innerHTML = "false";
      return item.appendChild(div);
    });

    document.querySelector("header").scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    questionsDom.current.style.pointerEvents = "none";

    setEndGame(true);
  }

  // smooth scrolling
  useEffect(() => {
    let [...elems] = document.querySelectorAll(".answers");

    elems.forEach((elem, index) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();

        if(elems[index + 1] === undefined) {
          document.querySelector(".get-results").scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
          return;
        } 
        elems[index + 1].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      })
    }) 
  }, [])
  
  return (
    <>
      <Header />
      <div className="container">
      <div className="game-container">
        <div ref={questionsDom} className="questions">
          {
            cards.map((card, index) => {
              if(index % 3 === 0) {
                return <ListeningComponent key={card.id} card={card} lastCard={cards.length - 1 === index ? true : false} />
              } 
              if(index % 2 === 0) {
                return <Chooice key={card.id} card={card} />
              } 
              return <TrueOrFalse key={card.id} card={card} index={index} />
            })
          }
        </div>
        {
          endGame === false ? 
          <Button 
            variant="contained"
            onClick={() => getUserAnswers()} 
            style={{marginBottom: "50px"}}
            className="get-results"
          >
            ?????????????????? ????????????????????
          </Button>

          :
          <Link 
            style={{marginBottom: "50px"}}
            className="main-button" 
            to="/"
          >
            ?????????????????? ???? ??????????????
          </Link>
        }
      </div>
      </div>
    </>
  );
}

export default Test;
