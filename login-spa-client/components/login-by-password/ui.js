import { setupClass } from "../../lib";
import classes from "./index.module.css";

export const uiLoginByPassword = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "form";
  wrapper.innerHTML = `
    <div class="col">
      <div class="row">
        <label class="label" for="phone">用户名：</label>
        <input class="username input" id="username" />
      </div>
      <p id="username-err-msg" class="username-err-msg  err-msg"></p>
    </div>
    <div class="col">
      <div class="row">
        <label class="label" for="phone">密码：</label>
        <input class="password input" id="password" type="password" />
      </div>
      <p id="password-err-msg" class="password-err-msg  err-msg"></p>
    </div>
    <div class="col">
      <div class="row">
        <label class="label" for="phone">验证码：</label>
        <input class="input code" id="code" type="number" />
      </div>
      <p id="code-err-msg" class="code-err-msg  err-msg"></p>
      <div class="row align-right">
        <canvas id="code-canvas" class="code-canvas">
          您的浏览器不支持canvas，请更新浏览器
        </canvas>
      </div>
    </div>
    <button id="submit" class="submit">登陆</button>
  `;
  setupClass(wrapper, classes);
  return wrapper;
};
