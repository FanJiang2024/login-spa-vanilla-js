import classes from "./index.module.css";
import closeIcon from "../../static/close-icon.svg";
import leftArrow from "../../static/left-arrow.svg";
import { setupClass } from "../../lib";

export const uiLoginWrapper = () => {
  const loginWrapper = document.createElement("div");
  loginWrapper.className = "login-wrapper";
  loginWrapper.innerHTML = `

    <img class="left-arrow-icon hidden" id="left-arrow-icon" src=${leftArrow} alt="close" />
    <img class="close-icon" id="close-icon" src=${closeIcon} alt="close" />
    <ul class="login-method-list" id="login-method-list">
      <li class="login-method">
        <button id="login-by-phone" class="login-btn login-by-phone" >通过手机号登陆</button>
      </li>
      <li class="login-method">
        <button id="login-by-password" class="login-btn login-by-apssword" >通过账号密码登陆</button>
      </li>
      <li class="login-method">
        <button id="login-by-scan" class="login-btn login-by-scan" >微信扫码登陆</button>
      </li>
    </ul>
  `;

  setupClass(loginWrapper, classes);

  return loginWrapper;
};
