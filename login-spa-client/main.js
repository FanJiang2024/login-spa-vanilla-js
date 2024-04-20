import "./style.css";
import { setupNavbar } from "./components/navbar/index.js";
import { setupPageRoot } from "./components/page-root/index.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div id="navbar" class="navbar"></div>
  <div id="page-root" class="page-root"></div>
  <div id="page-blink" class="page-blink hidden"></div>
`

const navbar = document.querySelector("#navbar");
const pageRoot = document.querySelector("#page-root");

setupNavbar(navbar);
setupPageRoot(pageRoot);
// setupModal();

