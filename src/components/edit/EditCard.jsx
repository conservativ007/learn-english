import React, {useState, useRef, useEffect} from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "../../styles/games/edit.css";
import { useParams } from 'react-router';
import { editWordToSetToLocalStorage } from '../../functions/editWordToSetToLocalStorage';

const EditCard = ({card, removeWord, setCards}) => {

  let params = useParams();

  const [cardEdit, setCardEdit] = useState(false);
  let ref = useRef(null);
  
  const [word, setWord] = useState(card.word);
  const [translate, setTranslate] = useState(card.translate);
  const [phrase, setPhrase] = useState(card.phrase);

  function prepareToSave() {
    let newCards = editWordToSetToLocalStorage(params.card_name, card.id, word, translate, phrase);
    setCardEdit(false);
    setCards(newCards);
  }

  useEffect(() => {
    if(ref.current === null) return;
    ref.current.querySelector("input").focus();
  }, [cardEdit]);

  if(cardEdit === true) {
    return (
      <div className="edit-inputs">
        <div className="edit-inputs__item"><TextField ref={ref} value={word} onChange={e => setWord(e.target.value)} variant="standard" /></div>
        <div className="edit-inputs__item"><TextField value={translate} onChange={e => setTranslate(e.target.value)} variant="standard" /></div>
        <div className="edit-inputs__item"><TextField value={phrase} onChange={e => setPhrase(e.target.value)} variant="standard" /></div>
        <Button onClick={() => prepareToSave()} variant="contained" color="success">
          сохранить
        </Button>
      </div>
    )
  }

  return (
    <div className="edit-card">
      <div className="edit-card__word">{card.word}</div>
      <div className="edit-card__word">{card.translate}</div>
      <div className="edit-card__word">{card.phrase}</div>
      <AiFillDelete onClick={() => removeWord(card.id)} className="edit-delete"/>
      <AiTwotoneEdit className="edit-edit" onClick={() => setCardEdit(true)} />
    </div>
  );
}

export default EditCard;
