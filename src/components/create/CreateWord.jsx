import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { addWordsAction } from '../../store/wordsReducer';

const CreateWord = ({index, lastCard, setCounter}) => {

  const [addPhrase, setAddPhrase] = useState(false);
  
  const [userWord, setUserWord] = useState("");
  const [userWordTranslate, setUserWordTranslate] = useState("");
  const [userPhrase, setUserPhrase] = useState("");

  let dispatch = useDispatch();

  function addTextField() {
    if(lastCard !== "last") return;
    setCounter(prev => prev + 1);
  }

// save word to wordReducer
  useEffect(() => {
    let testObj = {
      id: index,
      word: userWord.trim().toLowerCase(),
      translate: userWordTranslate.trim().toLowerCase(),
      phrase: userPhrase,
      isTrueUserAnswer: false,
      userAnswer: ""
    }

    dispatch(addWordsAction(testObj))
  }, [index, userWord, userWordTranslate, userPhrase, dispatch]);

  return (
    <>
      <div className="create-word">
        <TextField 
          className="max-width" 
          id="outlined-basic2" 
          label="введите слово на английском" 
          variant="standard" 
          onClick={() => addTextField()}
          onChange={(e) => setUserWord(e.target.value, "word")}
          value={userWord}
        />
          
        <TextField 
          className="max-width" 
          id="outlined-basic3" 
          label="введите перевод" 
          variant="standard" 
          onClick={() => addTextField()}
          onChange={(e) => setUserWordTranslate(e.target.value)}
          value={userWordTranslate}
        />
        <div className="create-word_phrase-word">
          <FormControlLabel control={<Checkbox />} label="добавить фразу со словом на английском" onChange={() => setAddPhrase(!addPhrase)} />
        </div>
          {
            addPhrase ? 
            <TextField 
              className="max-width" 
              id="outlined-basic4" 
              label="введите перевод" 
              variant="standard" 
              value={userPhrase}
              onChange={(e) => setUserPhrase(e.target.value)}
            />
             : null
          }
        <div className="create-word__marker"></div>
      </div>
    </>
  );
}

export default CreateWord;
