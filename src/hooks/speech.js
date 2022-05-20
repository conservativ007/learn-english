export function speech(sound, timedelay = false) {
  let voiceGirl = window.speechSynthesis.getVoices()[7];
  let speech = window.speechSynthesis;
  let text = new SpeechSynthesisUtterance(sound);
  text.lang = "en-CA";
  text.voice = voiceGirl;

  if(timedelay !== false) {
    let timerId = setTimeout(() => {
      speech.speak(text);
    }, Number(`${timedelay}000`))
    console.log(`есть задержка: ${timedelay}000 c`);
    return () => clearTimeout(timerId);
  } 
    
  
  
  speech.speak(text);
}

