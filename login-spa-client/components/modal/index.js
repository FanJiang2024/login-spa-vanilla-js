import { setupLoginWrapper } from "../login-wrapper";
import { uiModal } from "./ui"

export const setupModal = () => {
  const modal = uiModal();
  setupLoginWrapper(modal);

  const body = document.querySelector("body")
  body.appendChild(modal);

  const closeIcon = modal.querySelector("#close-icon");

  [closeIcon, modal].forEach(elem => {
    elem.onclick = (e) => {
      e.stopPropagation();
      closeModal();
    }
  })


  const closeModal = () => {
    modal.remove();
  }

  return closeModal;
}