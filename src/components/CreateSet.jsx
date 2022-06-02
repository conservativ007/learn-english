import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { saveToLocaleStorage } from '../hooks/saveToLocalStorage';
import { Link, useParams } from 'react-router-dom';

import "../styles/createSet.css";

const Createset = () => {

  const params = useParams();

  const [nameSet, setNameSet] = useState(params.set_name === "default" ? "" : params.set_name );
  const [isSet, setIsSet] = useState(params.set_name === "default" ? false : true);

  const [userWord, setUserWord] = useState("");
  const [wordTranslate, setwordTranslate] = useState("");
  const [phrase, setwordPhrase] = useState("");

  const [words, setWords] = useState([]);

  function setNameToSet() {
    if(nameSet.length === 0) return;
    setIsSet(true);
  } 

  function addword() { 
    let word = {
      id: Date.now(),
      category: nameSet,
      word: userWord.trim(),
      wordTranslate: wordTranslate.trim(),
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
        </div>
      </div>
      
    )
  }

  return ( 
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
        <InputGroup className="mb-3">
        <FormControl
          placeholder="введите фразу со словом"
          onChange={(e) => setwordPhrase(e.target.value)}
          value={phrase}
        />
        </InputGroup>
        <div className="button-controls">
          <Button onClick={() => addword()} >добавить слово</Button>
            <Link 
              onClick={() => saveSetwords()}
              className="save main-button" 
              to="/">
                save
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Createset;
