import React, { useRef, useState } from 'react';

import { saveToLocaleStorage } from '../../hooks/saveToLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from '@mui/material/Button';
import AlertMU from '@mui/material/Alert';

import CreateWord from './CreateWord';
import CreateSetName from './CreateSetName';
import { checkValidName } from '../../hooks/changeNameSetToLocalStorage';

import "../../styles/createSet.css";

const Createset = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [counter, setCounter] = useState(2);

  let words = useSelector(state => state.wordsReducer);
  let nameSet = useSelector(state => state.setNameReducer);
  
  const refAlertSuccess = useRef();
  const refAlertError = useRef();


  function prepareToSave() {
    let someWords = getCorrectWords();

    if(params.set_name === "default") {
      return checkMistakesAndSave(someWords);
    }

    if(someWords.length === 0) {
      return showAlert(refAlertError, "заполните хотябы одну карточку");
    }

    showAlert(refAlertSuccess);
    saveToLocaleStorage(params.set_name, someWords, "add");

    setTimeout(() => navigate(`/show-card/${params.set_name}`), 2000);
  }

  function checkMistakesAndSave(someWords) {
    if(nameSet.length === 0) {
      return showAlert(refAlertError, "введите название подборки");
    } 

    if(nameSet.length > 0 && checkValidName(nameSet) === true) {
      return showAlert(refAlertError, "такое имя уже существует выберите другое");
    }

    if(someWords.length === 0) {
      return showAlert(refAlertError, "заполните хотябы одну карточку");
    }

    saveToLocaleStorage(nameSet, someWords);
    showAlert(refAlertSuccess);
    setTimeout(() => navigate(`/show-card/${nameSet}`), 2000);
  }


  function showAlert(ref, text = false) {
    ref.current.style.display = "block";
    if(text !== false) ref.current.innerHTML = text;
    setTimeout(() => ref.current.style.display = "none", 2000);
  }

  function getCorrectWords() {
    return words.filter(item => item.word !== "" && item.translate !== "");
  }

  return ( 
    <div className="main-container">
      <div className="create-sets-container">
        <div className="create-sets-container__alerts">
          <Alert style={{display: "none", position: "absolute", top: "20px"}} ref={refAlertError} variant="danger"></Alert>
          <AlertMU style={{display: "none", position: "absolute", top: "20px"}} ref={refAlertSuccess}  severity="success">всё в порядке, сейчас вы всё увидите :)</AlertMU>
        </div>
        { 
          params.set_name === "default" ? 
          <div className="create-set"><CreateSetName /></div> : null 
        }
        <div className="create-words">
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
        </div>
        <div className="button-controls">
          <Button style={{marginTop: "20px", height: "50px"}} variant="contained" onClick={() => prepareToSave()}>сохранить</Button>
        </div>
      </div>
    </div>
  );
}

export default Createset;
