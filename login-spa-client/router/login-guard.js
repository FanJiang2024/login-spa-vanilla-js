import { setupModal } from "../components/modal";
import { request } from "../requests";
import { store } from "../lib/state";

export const loginGuard = async () => {
  return request("/api/v1/account/info", "GET").then(({ data={} }) => {
    const { code } = data;
    if (code == 200) {
      return Promise.resolve(data);
    } else {
      store["closeModal"] = setupModal();
      return Promise.reject(data);
    }
  });
};
