export function deleteWordFromLocalStorage(nameSet, cards) {
  localStorage.removeItem(nameSet);
  let json = JSON.stringify(cards);
  localStorage.setItem(nameSet, json);
}

export function deleteSetFromLocalStorage(nameSet) {
  localStorage.removeItem(nameSet);
  
  let items = JSON.parse(localStorage.getItem("LEARN_ENGLISH"));
  if(items.length === 1) {
      localStorage.clear();
    } else {
      let filtered = items.filter(i => i !== nameSet);
      localStorage.removeItem("LEARN_ENGLISH");
      localStorage.setItem("LEARN_ENGLISH", JSON.stringify(filtered));
  }
}

