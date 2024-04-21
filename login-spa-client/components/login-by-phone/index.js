import { canvasFingerPrint, checkCode, checkPhone, debounce } from "../../lib";
import { navigate } from "../../router/util";
import { uiLoginByPhone } from "./ui"

const CountDown = 60;

export const setupLoginByPhone = (parent) => {
  const wrapper = uiLoginByPhone();

  const fingerPrint = canvasFingerPrint();
  console.log("fingerPrint: ", fingerPrint);

  let phone, code, isPhonePassed = false, isCodePassed = false;
  let countDownId = null;
  let countDown = CountDown;

  const phoneElement = wrapper.querySelector("#phone");
  const codeElement = wrapper.querySelector("#code");
  const phoneErr = wrapper.querySelector("#phone-err-msg");
  const codeErr = wrapper.querySelector("#code-err-msg");
  const submit = wrapper.querySelector("#submit");
  const getCodeBtn = wrapper.querySelector("#get-code");
  
  const changeBtnStatus = () => {
    submit.disabled = !isCodePassed || !isPhonePassed;
    getCodeBtn.disabled = !isPhonePassed;
  }

  changeBtnStatus();

  const debouncedCheckPhone = debounce(function(phoneNum) {
    if(!checkPhone(phoneNum)) {
      phoneErr.innerHTML = "手机号码格式不正确";
      isPhonePassed = false;
    } else {
      phoneErr.innerHTML = "";
      isPhonePassed = true;
    }
    changeBtnStatus();
  }, 500)

  const debouncedCheckCode = debounce(function(code) {
    if(!checkCode(code)) {
      codeErr.innerHTML = "验证码不正确";
      isCodePassed = false;
    } else {
      codeErr.innerHTML = "";
      isCodePassed = true;
    }
    changeBtnStatus();
  })

  phoneElement.oninput = (e) => {
    e.stopPropagation();
    phoneElement.innerHTML = e.target.value;
    phone = e.target.value;
    debouncedCheckPhone(phone);
  };
  
  codeElement.oninput = (e) => {
    e.stopPropagation();
    e.innerHTML = e.target.value;
    code = e.target.value;
    debouncedCheckCode(code);
  }

  getCodeBtn.onclick = (e) => {
    e.stopPropagation();
    if(countDownId) {
      return;
    } else {
      getCodeBtn.disabled = true;
      countDownId = setInterval(() => {
        getCodeBtn.innerHTML = `重新获取(${countDown--})`;
        if(countDown < 0) {
          clearInterval(countDownId);
          countDownId = null;
          countDown = CountDown;
          getCodeBtn.innerHTML = "重新获取";
          getCodeBtn.disabled = false;
        } 
      }, 1000)
    }
  }

  submit.onclick = (e) => {
    e.stopPropagation();
    const { closeModal } = window.store;
    closeModal && closeModal();
    if(isCodePassed && isPhonePassed) {
      setTimeout(() => {
        document.cookie = "pass";
        navigate("/account");
      }, 500)
    }
  }

  return wrapper;
}