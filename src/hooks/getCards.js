export function getCards(params) {
  let array = JSON.parse(localStorage.getItem(params.card_name));
  return shuffle(array);
  
}


export function shuffle(array) {
  if(array && array.length > 0) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  return array; 
}