import React, {useRef, useState} from 'react';
import { changeNameSetToLocalStorage } from '../../hooks/changeNameSetToLocalStorage';
import { FormControl, Button, Alert } from 'react-bootstrap';
import {useParams, useNavigate} from "react-router";


const EditSetName = () => {
  
  const params = useParams();
  const [nameSet, setNameSet] = useState(params.set_name);
  const refAlertSuccess = useRef();
  const refAlertError = useRef();
  const navigate = useNavigate();

  function testFunc() {
    let isChangeSet = changeNameSetToLocalStorage(params.set_name, nameSet);

    if(isChangeSet === true) {
      refAlertSuccess.current.style.display = "block";
      
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } else {
      refAlertError.current.style.display = "block";

      setTimeout(() => {
        refAlertError.current.style.display = "none";
      }, 2000);
    }
    console.log(isChangeSet)
  }

  return (
    <div className="change-setname">
      <FormControl value={nameSet} onChange={(e) => setNameSet(e.target.value)} />
      <Button style={{marginTop: "10px"}} onClick={testFunc}>сохранить</Button>
      <Alert ref={refAlertSuccess} className="change-success-alert" variant="success">изменения упешно сохранены, вы будете перенаправлены на главную страницу через нескольо секунд</Alert>
      <Alert ref={refAlertError} className="change-error-alert" variant="danger">такое имя уже существует выберете другое</Alert>
    </div>
  );
}

export default EditSetName;
