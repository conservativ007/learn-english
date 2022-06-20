import React, {useState, useEffect, useRef} from 'react';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';

import { setNameAction } from '../../store/setNameReducer';
import { useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';


const CreateSetName = () => {

  const ref = useRef();

  const params = useParams();
  const dispatch = useDispatch();

  const [nameSet, setNameSet] = useState(params.set_name === "default" ? "" : params.set_name );

  useEffect(() => {
    dispatch(setNameAction(nameSet));
    ref.current.querySelector("input").focus();
  }, [nameSet, dispatch]);

  return (
    <>
      <TextField 
        ref={ref}
        className="max-width" 
        id="outlined-basic1" 
        label="введите название подборки" 
        variant="standard" 
        onChange={(e) => setNameSet(e.target.value)}
        value={nameSet}
      />
    </>
  );
}

export default CreateSetName;
