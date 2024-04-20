import { uiNavbar } from "./ui";
import { anchorPreventReload } from "../../lib/index";

export const setupNavbar = (navbar) => {
  uiNavbar(navbar);
  navbar.querySelectorAll("a")?.forEach((anchor) => {
    anchor.onclick = (e) => anchorPreventReload(e, anchor.href);
  });
};
