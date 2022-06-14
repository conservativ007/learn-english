export function addCustomClass(e, refContainer, selector, setCustomclass) {
  let elems = refContainer.current.querySelectorAll(`.${selector}`);
  [...elems].map(i => i.className = selector);
  e.target.classList.add(setCustomclass);
}