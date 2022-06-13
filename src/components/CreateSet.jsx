import React, { useRef, useState } from 'react';

import { saveToLocaleStorage } from '../hooks/saveToLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Alert } from 'react-bootstrap';
import Button from '@mui/material/Button';

import CreateWord from './CreateWord';
import CreateSetName from './CreateSetName';
import { checkValidName } from '../hooks/changeNameSetToLocalStorage';

import "../styles/createSet.css";

const Createset = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [counter, setCounter] = useState(2);

  let words = useSelector(state => state.wordsReducer);
  let nameSet = useSelector(state => state.setNameReducer);
  
  const refUserWords = useRef();
  const refAlertError = useRef();

  function saveSetwords(someWords) {
    if(params.set_name === "default") {
      saveToLocaleStorage(nameSet, someWords);
    } else {
      saveToLocaleStorage(nameSet, someWords, "add");
    }
  }

  function saveWordsToLocaleStorage() {
    if(nameSet.length === 0) {
      return showAlert("ввидете название подборки");
    } 

    if(nameSet.length > 0 && checkValidName(nameSet) === true) {
      return showAlert("такое имя уже существует выберите другое");
    }

    let someWords = getCorrectWords();

    if(someWords.length === 0) {
      return showAlert("заполните хотябы одну карточку");
    }

    saveSetwords(someWords);
    navigate("/");
  }

  function showAlert(text) {
    refAlertError.current.style.display = "block";
    refAlertError.current.innerHTML = text;
    setTimeout(() => refAlertError.current.style.display = "none", 2000);
  }

  function getCorrectWords() {
    return words.filter(item => {
      if(item.word !== "" && item.translate !== "") {
        return {
          id: item.id,
          word: item.word,
          translate: item.translate,
          phrase: item.phrase,
        }
      } 
      return null;
    })
  }

  return ( 
    <div className="main-container" ref={refUserWords}>
      <div className="create-sets-container">
        <div className="create-set">
          <CreateSetName />
          <Alert ref={refAlertError} className="change-error-alert" variant="danger"></Alert>
        </div>
        {
          [...Array(counter)].map((_, index) => {
            return <CreateWord 
              key={index} 
              index={index} 
              lastCard={index + 1 === counter ? "last" : undefined} 
              setCounter={setCounter} 
            />
          })
        }
        <div className="button-controls">
          <Button style={{marginTop: "20px"}} variant="contained" onClick={() => saveWordsToLocaleStorage()}>сохранить</Button>
        </div>
      </div>
    </div>
  );
}

export default Createset;
