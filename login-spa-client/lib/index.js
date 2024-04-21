import { loaderDataMap, navigate } from "../router/util";
import md5 from "md5";

Array.prototype.unique = function () {
  return [...new Set(this)];
};

export const anchorPreventReload = (e, to) => {
  e.preventDefault();
  e.stopPropagation();
  navigate(to);
};

export const replaceNodes = (element, newChild) => {
  element.childNodes.forEach((child) => child.remove());
  element.appendChild(newChild);
};

export const pageBlink = () => {
  const blink = document.querySelector("#page-blink");
  blink.classList.replace("hidden", "show");
  setTimeout(() => {
    blink.classList.replace("show", "hidden");
  }, 150);
};

// 递归设置class，很耗费性能
export const setupClass = (element, classes) => {
  requestAnimationFrame(() => {
    element.className = [...element.classList]
      .map((className) => classes[className] || className)
      .unique()
      .join(" ");
    element.childNodes.forEach((child) => {
      if (!child.classList) return;
      setupClass(child, classes);
    });
  });
};

export const checkPhone = (phone) => /^1[3-9][0-9]{9}$/.test(phone);

export const checkCode = (code, len = 4) =>
  new RegExp(`^[0-9]{${len}}$`).test(code);

export const checkVariableName = (str, minLen=8, maxLen = 20) =>
  new RegExp(`^[a-zA-Z_0-9]{${minLen},${maxLen}}$`).test(str);

export const checkString = (str, min = 8, max = 16) =>
  new RegExp(`^\\S{${min},${max}}$`).test(str);

export const debounce = (fn, delay = 300) => {
  let id;

  return function () {
    clearTimeout(id);
    id = setTimeout(() => {
      fn.apply(null, arguments);
      id = undefined;
    }, delay);
  };
};

export const useLoaderData = () => {
  const path = window.location.pathname;
  return loaderDataMap.get(path) ?? null;
};

export const randomNum = (min = 128, max = 256) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const randomLightColor = () =>
  `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

export const randomDarkColor = () =>
  `rgb(${randomNum(0, 128)}, ${randomNum(0, 128)}, ${randomNum(0, 128)})`;


export const canvasFingerPrint = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(255,255,255, 0)";
  ctx.fillRect(0, 0, 1, 1);
  return md5(canvas.toDataURL());
}