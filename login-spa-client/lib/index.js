import { loaderDataMap, navigate } from "../router/util";

Array.prototype.unique = function() {
  return [...new Set(this)];
}

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
      .map((className) => (classes[className] || className))
      .unique()
      .join(" ");
    element.childNodes.forEach((child) => {
      if (!child.classList) return;
      setupClass(child, classes);
    });
  });
};

export const checkPhone = (phone) => /^1[3-9][0-9]{9}$/.test(phone);

export const checkCode = (code, len=4) => new RegExp(`[0-9]{${len}}`).test(code);

export const debounce = (fn, delay=300) => {
  let id;

  return function() {
    clearTimeout(id);
    id = setTimeout(() => {
      fn.apply(null, arguments);
      id = undefined;
    }, delay)
  }
}

export const useLoaderData = () => {
  const path = window.location.pathname;
  return loaderDataMap.get(path) ?? null;
}