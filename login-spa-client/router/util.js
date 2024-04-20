import { pageBlink } from "../lib";

export const navigate = (to, replace = false) => {
  if (replace) {
    window.history.replaceState({}, "", to);
  } else {
    window.history.pushState({}, "", to);
  }
  const navigationEvent = new PopStateEvent("navigate");
  window.dispatchEvent(navigationEvent);
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
            pathRef.path = window.location.pathname;
            const content = pageFn();
            return content;
          })
          .catch((err) => {
            console.log("loader error: ", err);
            switch (err.status) {
              case 401: {
                alert(err.msg);
              }
            }
            return;
          });
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
