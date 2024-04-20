import { setupLoginByPhone } from "../login-by-phone";
import { uiLoginWrapper } from "./ui"
import classes from "./index.module.css";

export const setupLoginWrapper = (parent) => {
  const loginWrapper = uiLoginWrapper();
  parent.appendChild(loginWrapper);

  loginWrapper.onclick = (e) => {
    e.stopPropagation();
  };

  const loginByPhone = loginWrapper.querySelector("#login-by-phone");
  const loginByPassword = loginWrapper.querySelector("#login-by-password");
  const loginByScan = loginWrapper.querySelector("#login-by-scan");

  const content = loginWrapper.querySelector("#login-method-list");
  const backArrow = loginWrapper.querySelector("#left-arrow-icon");

  let component;

  const cfg = [
    {
      btn: loginByPhone,
      componentFn: setupLoginByPhone,
    },
    {
      btn: loginByPassword,
      componentFn: () => "loginByPassword",
    },
    {
      btn: loginByScan,
      componentFn: () => "loginByScan",
    },
  ];

  cfg.forEach(({ btn, componentFn }) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      content.remove();
      component = componentFn();
      loginWrapper.appendChild(component);
      backArrow.classList.replace(classes.hidden, classes.show);
    }
  })

  backArrow.onclick = function(e) {
    e.stopPropagation();
    component.remove();
    backArrow.classList.replace(classes["show"], classes["hidden"]);
    loginWrapper.appendChild(content);
  }
}