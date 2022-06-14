export function speech(sound, timedelay = false, counter) {
  let voiceGirl = window.speechSynthesis.getVoices()[6];
  let speech = window.speechSynthesis;
  let text = new SpeechSynthesisUtterance(sound);
  text.lang = "en-US";
  text.voice = voiceGirl;

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
}

