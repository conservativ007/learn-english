export function getCards(params, card) {
  let array = JSON.parse(localStorage.getItem(params.card_name));
  array = shuffle(array);
  let result = [];
  
  if(card !== undefined) {
    result = array.filter(item => item.id !== card.id);
    result.unshift(card);
    result = result.slice(0, 4);
    array = result;
  }
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