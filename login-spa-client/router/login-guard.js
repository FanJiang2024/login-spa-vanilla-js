import { setupModal } from "../components/modal";

export const loginGuard = async () => {

  if (!document.cookie) {
    window.store = { closeModal: setupModal() };
    return Promise.reject({ status: 401, msg: "请先登陆" });
  }
  return Promise.resolve({ status: 200 });
};
