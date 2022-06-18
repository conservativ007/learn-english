export function editWordToSetToLocalStorage(setName, wordId, newWord, newTranslate, newPhrase) {
  let cards = JSON.parse(localStorage.getItem(setName));

  let newCards = cards.map(card => {
    if(card.id === wordId) {
      return {
        id: wordId,
        word: newWord.toLowerCase(),
        translate: newTranslate.toLowerCase(),
        phrase: newPhrase
      }
    }
    return card;
  })

  localStorage.removeItem(setName);
  localStorage.setItem(setName, JSON.stringify(newCards));

  return newCards;
}