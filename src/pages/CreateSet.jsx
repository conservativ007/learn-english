import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { saveToLocaleStorage } from '../hooks/saveToLocalStorage';
import { addWordsAction } from '../store/wordsReducer';

const styles = {
  formContainer: {
    margin: "20px auto",
    width: "600px"
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
      world: world,
      worldTranslate: worldTranslate,
      phrase: phrase,
    }
    dispatch(addWordsAction(testObj))
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
        placeholder="введите слово или несколько слов через запятую"
        onChange={(e) => setWorld(e.target.value)}
        value={world}
      />
      </InputGroup>

      <InputGroup className="mb-3">
      <FormControl
        placeholder="введите перевод"
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
      <Button onClick={() => addWorld()} >добавить слово</Button>
      <Button onClick={() => saveSetWorlds()} >save</Button>
    </div>
  );
}

export default Createset;
