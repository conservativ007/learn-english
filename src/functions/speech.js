export function speech(sound, timedelay = false, counter) {

  let speech = window.speechSynthesis;
  let text = new SpeechSynthesisUtterance(sound);
  text.lang = "en-US";

  const getVoice = new Promise(function(resolve, reject) {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length !== 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", function() {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      });
    }
  }) 

  getVoice.then(voices => {
    text.voice = voices[6];

    if(timedelay !== false) {
      let timerId = setTimeout(() => {
        speech.speak(text);
      }, Number(`${timedelay}000`))
      return () => clearTimeout(timerId);
    } 
  
    if(counter % 2 === 0) {
      text.rate = 0.5;
    } else {
      text.rate = 1;
    }
    speech.speak(text);
  });
}

