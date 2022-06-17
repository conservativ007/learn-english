export function showAlert(ref, text = false, success = false) {
  ref.current.style.top = window.pageYOffset + 20 + "px";
  ref.current.style.opacity = 1;
  ref.current.style.zIndex = 1;
  ref.current.style.backgroundColor = success === false ? "#f44336" : "#2fb986";
  if(text !== false) ref.current.innerHTML = text;
  setTimeout(() => {
    ref.current.style.opacity = 0;
    ref.current.style.zIndex = 0;
  }, 1500);
}