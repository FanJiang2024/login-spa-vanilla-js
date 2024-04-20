import classes from "./index.module.css";

export const uiPageRoot = (element) => {
  element.className = classes["page-root"];
  return element;
}