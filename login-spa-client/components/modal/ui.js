import classes from "./index.module.css";


export const uiModal = () => {
  const modal = document.createElement("div");
  modal.className = classes.modal;

  return modal;
}