import { checkCode, checkPhone, debounce } from "../../lib";
import { navigate } from "../../router/util";
import { uiLoginByPhone } from "./ui"

export const setupLoginByPhone = (parent) => {
  const wrapper = uiLoginByPhone();
  let phone, code, isPhonePassed = false, isCodePassed = false;

  const phoneElement = wrapper.querySelector("#phone");
  const codeElement = wrapper.querySelector("#code");
  const phoneErr = wrapper.querySelector("#phone-err-msg");
  const codeErr = wrapper.querySelector("#code-err-msg");
  const submit = wrapper.querySelector("#submit");
  
  const changeSubmitStatus = () => {
    submit.disabled = !isCodePassed || !isPhonePassed;
  }

  changeSubmitStatus();

  const debouncedCheckPhone = debounce(function(phoneNum) {
    if(!checkPhone(phoneNum)) {
      phoneErr.innerHTML = "手机号码格式不正确";
      isPhonePassed = false;
    } else {
      phoneErr.innerHTML = "";
      isPhonePassed = true;
    }
    changeSubmitStatus();
  }, 500)

  const debouncedCheckCode = debounce(function(code) {
    if(!checkCode(code)) {
      codeErr.innerHTML = "验证码不正确";
      isCodePassed = false;
    } else {
      codeErr.innerHTML = "";
      isCodePassed = true;
    }
    changeSubmitStatus();
  })

  phoneElement.oninput = (e) => {
    e.stopPropagation();
    phoneElement.innerHTML = e.target.value;
    phone = e.target.value;
    if(phone) {
      debouncedCheckPhone(phone);
    } else {
      phoneErr.innerHTML = "";
    }
  };
  
  codeElement.oninput = (e) => {
    e.stopPropagation();
    e.innerHTML = e.target.value;
    code = e.target.value;
    if(code) {
      debouncedCheckCode(code);
    } else {
      codeErr.innerHTML = "";
    }
  }

  submit.onclick = (e) => {
    e.stopPropagation();
    if(isCodePassed && isPhonePassed) {
      setTimeout(() => {
        document.cookie = "pass";
        const { closeModal } = window.store;
        closeModal && closeModal();
        navigate("/account");
      }, 500)
    }
  }

  return wrapper;
}