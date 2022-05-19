export function speech(sound) {
  let voiceGirl = window.speechSynthesis.getVoices()[7];
  let speech = window.speechSynthesis;
  let text = new SpeechSynthesisUtterance(sound);
  text.lang = "en-CA";
  text.voice = voiceGirl;
  speech.speak(text);
}

