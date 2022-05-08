export function saveToLocaleStorage(setName, array) {
  const LEARN_ENGLISH = "LEARN_ENGLISH";

  if(localStorage.getItem(LEARN_ENGLISH) === null) {
    localStorage.setItem(LEARN_ENGLISH, JSON.stringify([setName]));
  } else {
  let getArraylocalStorage = JSON.parse(localStorage.getItem(LEARN_ENGLISH));
    getArraylocalStorage.push(setName);
    localStorage.setItem(LEARN_ENGLISH, JSON.stringify(getArraylocalStorage));
  }

  if(localStorage.getItem(setName) === null) {
    let json = JSON.stringify(array);
    localStorage.setItem(setName, json);
  }
}






