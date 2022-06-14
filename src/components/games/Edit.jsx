import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router";
import "../../styles/games/edit.css";
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import Header from '../Header';
import { deleteSetFromLocalStorage, deleteWordFromLocalStorage } from '../../functions/deleteFromLocalStorage';

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem(params.card_name)));

  function removeWord(id) {
    let newArr = cards.filter(i => i.id !== id);
    setCards(newArr);
    deleteWordFromLocalStorage(params.card_name, newArr);
  }

  useEffect(() => {
    if(cards.length === 0) {
      deleteSetFromLocalStorage(params.card_name);
      navigate("/");
    }
  }, [cards, params.card_name, navigate]);

  if(cards.length > 0)
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="game-container">
          <div className="edit">
            <div className="edit-setname">
              <div className="set-name">{params.card_name}</div>
              <Link className="main-button" to={`/edit-setname/${params.card_name}`}>сменить название</Link>
              <div className="edit-setname_marker"></div>
            </div>
            
            { 
              cards.map((card, index) => 
                <div key={index} className="edit-card">
                  <div className="edit-card_word">{card.word}</div>
                  <div className="edit-card_word">{card.translate}</div>
                  <AiFillDelete onClick={() => removeWord(card.id)} className="edit-delete"/>
                </div>  
              )
            }
          </div>
          <Link className="edit-button main-button" to={`/create-set/${params.card_name}`}>добавить слово</Link>
        </div>
      </div>
    </>
  );
}

export default Edit;
