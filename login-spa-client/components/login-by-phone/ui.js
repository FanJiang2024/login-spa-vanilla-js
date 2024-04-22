import { setupClass } from "../../lib";
import classes from "./index.module.css";

export const uiLoginByPhone = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "form";
  wrapper.innerHTML = `
    <div class="col">
      <div class="row">
        <label class="label" for="phone">手机号码：</label>
        <input class="phone-number input" id="phone" type="number" />
      </div>
      <p id="phone-err-msg" class="phone-err-msg  err-msg"></p>
    </div>
    <div class="col">
      <div class="row">
        <label class="label" for="phone">验证码：</label>
        <input class="input code" id="code" type="number" />
      </div>
      <p id="code-err-msg" class="code-err-msg  err-msg"></p>
      <div class="get-code-wrapper align-right">
        <button id="get-code" class="get-code">获取验证码</button>
      </div>
    </div>
    <button id="submit" class="submit">登陆</button>
  `;
  setupClass(wrapper, classes);
  return wrapper;
};
