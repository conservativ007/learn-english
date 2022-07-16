import React, {useRef, useState, useEffect} from 'react';
import { changeNameSetToLocalStorage } from '../../functions/changeNameSetToLocalStorage';
import {useParams, useNavigate} from "react-router";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "../../styles/games/edit.css";
import MuAlert from '../alerts/MuAlert';
import { showAlert } from '../alerts/showAlert';

const EditSetName = () => {
  
  const params = useParams();
  const [nameSet, setNameSet] = useState(params.set_name);
  const muAlertRef = useRef();
  const ref = useRef();
  const navigate = useNavigate();

  function testFunc() {
    let isChangeSet = changeNameSetToLocalStorage(params.set_name, nameSet);

    if(isChangeSet === true) {
      showAlert(muAlertRef, "изменения успешно сохранены вы будете перенаправлены на главную страницу через несколько секунд", true);
      setTimeout(() => navigate("/"), 2000);
    } else {
      showAlert(muAlertRef, "такое имя уже существует, выберете другое", false);
    }
  }

  useEffect(() => {
    ref.current.querySelector("input").focus();
  }, []);

  return (
    <div className="container">
      <div className="change-setname">
        <MuAlert ref={muAlertRef} />
        <TextField 
          ref={ref}
          className="max-width change-setname__input" 
          id="outlined-basic5" 
          variant="standard" 
          onChange={(e) => setNameSet(e.target.value)}
          value={nameSet}
        />
        <Button style={{marginTop: "20px"}} variant="contained" onClick={() => testFunc()}>сохранить</Button>
      </div>
    </div>
    
  );
}

export default EditSetName;
