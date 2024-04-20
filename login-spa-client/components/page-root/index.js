import { createRoute, navigate } from "../../router/util";
import "./index.css";
import { replaceNodes } from "../../lib";
import { routes } from "../../router";

export const pageContent = (element) => {
  const validRoutes = routes.map((route) => route.path);

  return () => {
    const { pathname } = window.location;

    if (!validRoutes.includes(pathname)) {
      navigate("/not-found", true);
      return;
    }
    const content = routes
      .map(createRoute)
      .find((pageContent) => !!pageContent);

    if (content.className !== undefined) {
      replaceNodes(element, content);
    } else if (content.__proto__ === Promise.prototype) {
      content
        .then((res) => {
          res && replaceNodes(element, res);
        })
        
    } else {
      console.log("........", content);
    }
  };
};

export const setupPageRoot = (pageRoot) => {
  const page = pageContent(pageRoot);

  window.onload = () => {
    // 监听 history.pushState、history.replaceState 动作
    window.addEventListener("navigate", page);
    // 监听浏览器 前进、返回 动作, 无法监听 history.pushState、history.replaceState 动作
    window.addEventListener("popstate", page);
  };

  window.onbeforeunload = () => {
    window.removeEventListener("navigate", page);
    window.removeEventListener("popstate", page);
  };

  page();
};
