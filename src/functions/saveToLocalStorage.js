export function saveToLocaleStorage(setName, array, action = false) {
  
  if(action === false) {
    setLearnEnglish(setName);
    save(setName, array);
  }
  
  if(action === "add") {
    add(setName, array);
  } 
}

function add(setName, newWords) {
  let oldArr = JSON.parse(localStorage.getItem(setName));

  // change id word ( get unique id ) 
  let getCorrectWords = [...newWords, ...oldArr].map((item, index) => {
    return {
      ...item,
      id: index
    }
  })

  localStorage.removeItem(setName);
  localStorage.setItem(setName, JSON.stringify([...getCorrectWords]));
}

function save(setName, array) {
  localStorage.setItem(setName, JSON.stringify(array));
}

function setLearnEnglish(name) {
  const LEARN_ENGLISH = "LEARN_ENGLISH";

  if(localStorage.getItem(LEARN_ENGLISH) === null) {
    localStorage.setItem(LEARN_ENGLISH, JSON.stringify([name]));
  } else {
    let getArraylocalStorage = JSON.parse(localStorage.getItem(LEARN_ENGLISH));
    getArraylocalStorage.push(name);
    localStorage.setItem(LEARN_ENGLISH, JSON.stringify(getArraylocalStorage));
  }
}






