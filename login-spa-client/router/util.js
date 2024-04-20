import { pageBlink } from "../lib";

export const navigate = (to, replace = false) => {
  if(typeof to === "string") {
    if (replace) {
      window.history.replaceState({}, "", to);
    } else {
      window.history.pushState({}, "", to);
    }

    const navigationEvent = new PopStateEvent("navigate");
    window.dispatchEvent(navigationEvent);
  } else if(typeof to === "number") {
    window.history.go(to);
  } else {
    console.warn("wrong paramater to: ", to);
  }
}; 

const createRouteHoc = () => {
  const pathRef = { path: window.location.pathname };
  const map = new Map();

  const createRoute = ({ path, pageFn, loader }) => {
    if (window.location.pathname === path) {
      if (window.location.pathname === pathRef.path) {
        pageBlink();
      }

      if (!!loader) {
        // navigate to a new page
        return loader()
          .then((res) => {
            console.log("loader data: ", res);
            map.set(path, res);
            const content = pageFn();
            return content;
          })
          .catch((err) => {
            console.log("loader error: ", err);
            navigate(-1);
            return;
          })
          .finally(() => {
            pathRef.path = window.location.pathname;
          })
      }

      pathRef.path = window.location.pathname;
      return pageFn();
    }
    return null;
  };

  return { createRoute, loaderDataMap: map };
};

const res = createRouteHoc();

export const createRoute = res.createRoute;
export const loaderDataMap = res.loaderDataMap;
