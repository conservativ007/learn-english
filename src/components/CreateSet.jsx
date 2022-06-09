import React, { useRef, useState } from 'react';
import { Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { saveToLocaleStorage } from '../hooks/saveToLocalStorage';
import { Link, useParams } from 'react-router-dom';

import "../styles/createSet.css";
import { checkValidName } from '../hooks/changeNameSetToLocalStorage';

const Createset = () => {

  const params = useParams();

  const [nameSet, setNameSet] = useState(params.set_name === "default" ? "" : params.set_name );
  const [isSet, setIsSet] = useState(params.set_name === "default" ? false : true);

  const [userWord, setUserWord] = useState("");
  const [wordTranslate, setwordTranslate] = useState("");
  const [phrase, setwordPhrase] = useState("");

  const [addPhrase, setAddPhrase] = useState(false);

  const refAlertError = useRef();

  const [words, setWords] = useState([]);

  function setNameToSet() {
    if(nameSet.length === 0) return;
    if(checkValidName(nameSet) === true) {
      refAlertError.current.style.display = "block";
      setTimeout(() => refAlertError.current.style.display = "none", 2000);
      return;
    }
    setIsSet(true);
  } 

  function addword() { 
    let word = {
      id: Date.now(),
      category: nameSet,
      word: userWord.trim().toLowerCase(),
      wordTranslate: wordTranslate.trim().toLowerCase(),
      phrase: phrase,
      isTrueUserAnswer: false,
      userAnswer: ""
    }

    setWords([...words, word]);
    setUserWord("");
    setwordTranslate("");
    setwordPhrase("");
  }

  function saveSetwords() {
    if(params.set_name === "default") {
      saveToLocaleStorage(nameSet, words);
    } else {
      saveToLocaleStorage(nameSet, words, "add");
    }
  }

  if(isSet === false) {
    return (
      <div className="main-container">
        <div className="create-sets-container">
          <div className="create-set">
            <InputGroup className="mb-3">
            <FormControl
              placeholder="введите название сета"
              onChange={(e) => setNameSet(e.target.value)}
              value={nameSet}
            />
            </InputGroup>
            <Button onClick={() => setNameToSet()} >ввод</Button>
            <Alert ref={refAlertError} className="change-error-alert" variant="danger">такое имя уже существует выберете другое</Alert>
          </div>
        </div>
      </div>
    )
  }

  return ( 
    <div className="main-container">
      <div className="create-sets-container">
        <div className="create-word">
          <InputGroup className="mb-3">
          <FormControl
            placeholder="введите слово"
            onChange={(e) => setUserWord(e.target.value)}
            value={userWord}
          />
          </InputGroup>

          <InputGroup className="mb-3">
          <FormControl
            placeholder="введите перевод"
            onChange={(e) => setwordTranslate(e.target.value)}
            value={wordTranslate}
          />
          </InputGroup>
          <div className="create-word_phrase-word">
            <input type="checkbox" onChange={() => setAddPhrase(!addPhrase)} checked={addPhrase} />
            <div onClick={() => setAddPhrase(!addPhrase)}>добавить фразу со словом на английском</div>
          </div>
          {
            addPhrase ? 
            <InputGroup className="mb-3">
              <FormControl
                placeholder="введите фразу со словом"
                onChange={(e) => setwordPhrase(e.target.value)}
                value={phrase}
              />
            </InputGroup> : null
          }
          
          <div className="button-controls">
            <Button onClick={() => addword()} >добавить слово</Button>
            {
              words.length > 0 ?
                <Link 
                  onClick={() => saveSetwords()}
                  className="save main-button" 
                  to="/">
                    сохранить
                </Link>
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createset;
