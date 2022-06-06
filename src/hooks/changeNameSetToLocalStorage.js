export function changeNameSetToLocalStorage(oldName, newName) {
  if(checkValidName(newName) === false) {
    changeSetsName(oldName, newName);
    changeName(oldName, newName);
    return true;
  } 
  return false;
}

function changeSetsName(oldName, newName) {
  let setNames = JSON.parse(localStorage.getItem("LEARN_ENGLISH"));
  let indexSetName = setNames.indexOf(oldName);
  setNames.splice(indexSetName, 1, newName);
  localStorage.setItem("LEARN_ENGLISH", JSON.stringify(setNames));
}

function changeName(oldName, newName) {
  let set = JSON.parse(localStorage.getItem(oldName));
  localStorage.removeItem(oldName);
  localStorage.setItem(newName, JSON.stringify(set));
}

export function checkValidName(newName) {
  let setNames = JSON.parse(localStorage.getItem("LEARN_ENGLISH"));
  let bool = setNames.includes(newName);
  return bool;
}