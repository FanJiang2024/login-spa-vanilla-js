import { navigate } from "../../router/util";
import { uiLoginByPassword } from "./ui";
import { checkCode, checkString, checkVariableName, debounce } from "../../lib";
import { randomCodeInCanvas } from "../../lib/canvasRandomCode";

export const setupLoginByPassword = (parent) => {
  const wrapper = uiLoginByPassword();
  let username,
    password,
    code,
    correctCode,
    isUsernamePassed = false,
    isPasswordPassed = false,
    isCodePassed = false;

  const usernameElement = wrapper.querySelector("#username");
  const passwordElement = wrapper.querySelector("#password");
  const codeElement = wrapper.querySelector("#code");
  const codeCanvasElement = wrapper.querySelector("#code-canvas");
  const usernameErr = wrapper.querySelector("#username-err-msg");
  const passwordErr = wrapper.querySelector("#password-err-msg");
  const codeErr = wrapper.querySelector("#code-err-msg");
  const submit = wrapper.querySelector("#submit");

  correctCode = randomCodeInCanvas(codeCanvasElement);

  const changeSubmitStatus = () => {
    submit.disabled = !isCodePassed || !isUsernamePassed || !isPasswordPassed;
  };

  changeSubmitStatus();

  const debouncedCheckUsername = debounce(function (username) {
    if (!checkVariableName(username)) {
      usernameErr.innerHTML = "用户名格式不正确";
      isUsernamePassed = false;
    } else {
      usernameErr.innerHTML = "";
      isUsernamePassed = true;
    }
    changeSubmitStatus();
  }, 500);

  const debouncedCheckPassword = debounce(function (password) {
    if (!checkString(password)) {
      passwordErr.innerHTML = "密码格式不正确";
      isPasswordPassed = false;
    } else {
      passwordErr.innerHTML = "";
      isPasswordPassed = true;
    }
    changeSubmitStatus();
  }, 500);

  const debouncedCheckCode = debounce((code, num) => {
    if (!checkCode(code) || code !== num) {
      codeErr.innerHTML = "验证码不正确";
      isCodePassed = false;
    } else {
      codeErr.innerHTML = "";
      isCodePassed = true;
    }
    changeSubmitStatus();
  });

  usernameElement.oninput = (e) => {
    e.stopPropagation();
    username = (e.target.value || "").trim();
    usernameElement.innerHTML = username;
    debouncedCheckUsername(username);
  };

  passwordElement.oninput = (e) => {
    e.stopPropagation();
    password = e.target.value || "";
    passwordElement.innerHTML = password;
    debouncedCheckPassword(password);
  };

  codeElement.oninput = (e) => {
    e.stopPropagation();
    code = (e.target.value || "").trim();
    codeElement.innerHTML = code;
    debouncedCheckCode(code, correctCode);
  };

  codeCanvasElement.onclick = (e) => {
    e.stopPropagation();
    correctCode = randomCodeInCanvas(codeCanvasElement);
  }

  submit.onclick = (e) => {
    e.stopPropagation();
    const { closeModal } = window.store;
    closeModal && closeModal();
    if (isCodePassed && isPasswordPassed && isUsernamePassed) {
      setTimeout(() => {
        document.cookie = "pass";
        navigate("/account");
      }, 500);
    }
  };

  return wrapper;
};
