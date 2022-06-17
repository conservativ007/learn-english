import React, { useRef, useState } from 'react';

import { saveToLocaleStorage } from '../../functions/saveToLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';

import CreateWord from './CreateWord';
import CreateSetName from './CreateSetName';
import { checkValidName } from '../../functions/changeNameSetToLocalStorage';

import MuAlert from '../alerts/MuAlert';
import { showAlert } from '../alerts/showAlert';

const Createset = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [counter, setCounter] = useState(2);

  let words = useSelector(state => state.wordsReducer);
  let nameSet = useSelector(state => state.setNameReducer);
  
  const muAlertRef = useRef();

  function checkMistakesAndSave() {
    let someWords = getCorrectWords();

    if(nameSet.length === 0) {
      return showAlert(muAlertRef, "введите название подборки", false);
    } 

    if(nameSet.length > 0 && checkValidName(nameSet) === true && params.set_name === "default") {
      return showAlert(muAlertRef, "такое имя уже существует выберите другое", false);
    }

    if(someWords.length === 0) {
      return showAlert(muAlertRef, "заполните хотябы одну карточку", false);
    }

    if(params.set_name === "default") {
      saveToLocaleStorage(nameSet, someWords);
      showAlert(muAlertRef, "всё в порядке, сейчас вы всё увидите :)", true);
      setTimeout(() => navigate(`/show-card/${nameSet}`), 2000);
    } else {
      saveToLocaleStorage(params.set_name, someWords, "add")
      showAlert(muAlertRef, "всё в порядке, сейчас вы всё увидите :)", true);
      setTimeout(() => navigate(`/show-card/${params.set_name}`), 2000);
    }
  }

  function getCorrectWords() {
    return words.filter(item => item.word !== "" && item.translate !== "");
  }

  return ( 
    <div className="main-container">
      <div className="create-sets-container">
        <div className="create-sets-container__alerts">
          <MuAlert ref={muAlertRef} />
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
          <Button style={{marginTop: "20px", height: "50px"}} variant="contained" onClick={() => checkMistakesAndSave()}>сохранить</Button>
        </div>
      </div>
    </div>
  );
}

export default Createset;
