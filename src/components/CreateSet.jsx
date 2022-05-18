import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { saveToLocaleStorage } from '../hooks/saveToLocalStorage';
import { addWordsAction } from '../store/wordsReducer';
import { Link } from 'react-router-dom';

import "../styles/createSet.css";

const styles = {
  formContainer: {
    margin: "20px auto",
    width: "600px"
  },
  link: {
    color: "white",
    textDecoration: "none",
  }
}

const Createset = () => {

  let someWords = useSelector(state => state.wordsReducer);
  let dispatch = useDispatch();


  const [nameSet, setNameSet] = useState("");
  const [isSet, setIsSet] = useState(false);

  const [world, setWorld] = useState("");
  const [worldTranslate, setWorldTranslate] = useState("");
  const [phrase, setWorldPhrase] = useState("");


  function setNameToSet() {
    if(nameSet.length === 0) return;
    setIsSet(true);
  } 

  function addWorld() { 
    let testObj = {
      id: Date.now(),
      category: nameSet,
      word: world.trim(),
      wordTranslate: worldTranslate.split(","),
      phrase: phrase,
    }
    dispatch(addWordsAction(testObj));
    setWorld("");
    setWorldTranslate("");
    setWorldPhrase("");
  }

  function saveSetWorlds() {
    saveToLocaleStorage(nameSet, someWords)
  }

  if(isSet === false) {
    return (
      <div style={styles.formContainer}>
        <InputGroup className="mb-3">
        <FormControl
          placeholder="введите название сета"
          onChange={(e) => setNameSet(e.target.value)}
          value={nameSet}
        />
        </InputGroup>
        <Button onClick={() => setNameToSet()} >ввод</Button>
      </div>
    )
  }

  return ( 
    <div style={styles.formContainer} >
      <InputGroup className="mb-3">
      <FormControl
        placeholder="введите слово"
        onChange={(e) => setWorld(e.target.value)}
        value={world}
      />
      </InputGroup>

      <InputGroup className="mb-3">
      <FormControl
        placeholder="введите перевод: word1, word2,..."
        onChange={(e) => setWorldTranslate(e.target.value)}
        value={worldTranslate}
      />
      </InputGroup>
      <InputGroup className="mb-3">
      <FormControl
        placeholder="введите фразу со словом"
        onChange={(e) => setWorldPhrase(e.target.value)}
        value={phrase}
      />
      </InputGroup>
      <div className="button-controls">
        <Button onClick={() => addWorld()} >добавить слово</Button>
          <Link 
            onClick={() => saveSetWorlds()}
            style={styles.link} 
            className="save" 
            to="/">
              save
          </Link>
      </div>
      
    </div>
  );
}

export default Createset;
