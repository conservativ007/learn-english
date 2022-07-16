import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router";
import "../../styles/games/edit.css";
import Header from '../Header';
import EditCard from './EditCard';

import Button from '@mui/material/Button';
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

  if(cards && cards.length > 0)
  return (
    <>
      <Header />
      <div className="container">
        <div className="game-container">
          <div className="edit">
            <div className="edit-setname">
              <div className="set-name">{params.card_name}</div>
              <Button 
                style={{marginLeft: "20px"}}
                variant="contained"
                onClick={() => navigate(`/edit-setname/${params.card_name}`)} 
              >
                сменить название
              </Button>
              <div className="edit-setname_marker"></div>
            </div>
            { 
              cards.map((card, index) => 
                <EditCard 
                  key={index} 
                  card={card} 
                  removeWord={removeWord} 
                  setCards={setCards}
                />
              )
            }
          </div>
          <Button variant="contained" style={{marginTop: "20px"}} onClick={() => navigate(`/create-set/${params.card_name}`)}>
            добавить слово
          </Button>
        </div>
      </div>
    </>
  );
}

export default Edit;
