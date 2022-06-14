import React, {useRef, useState} from 'react';
import { changeNameSetToLocalStorage } from '../../hooks/changeNameSetToLocalStorage';
// import { Alert } from 'react-bootstrap';
import {useParams, useNavigate} from "react-router";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import "../../styles/games/edit.css";


const EditSetName = () => {
  
  const params = useParams();
  const [nameSet, setNameSet] = useState(params.set_name);
  const refAlertSuccess = useRef();
  const refAlertError = useRef();
  const navigate = useNavigate();

  function testFunc() {
    let isChangeSet = changeNameSetToLocalStorage(params.set_name, nameSet);

    if(isChangeSet === true) {
      refAlertSuccess.current.style.visibility = "visible";
      
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } else {
      refAlertError.current.style.visibility = "visible";
      setTimeout(() => {
        refAlertError.current.style.visibility = "hidden";
      }, 2000);
    }
  }

  return (
    <div className="change-setname">
      <Alert severity="success" ref={refAlertSuccess} className="change-setname__alert-success">изменения успешно сохранены вы будете перенаправлены на главную страницу через несколько секунд</Alert>
      <Alert severity="error" ref={refAlertError} className="change-setname__alert-error">такое имя уже существует, выберете другое</Alert>
      <TextField 
        className="max-width change-setname__input" 
        id="outlined-basic5" 
        variant="standard" 
        onChange={(e) => setNameSet(e.target.value)}
        value={nameSet}
      />
      <Button style={{marginTop: "20px"}} variant="contained" onClick={() => testFunc()}>сохранить</Button>
    </div>
  );
}

export default EditSetName;
