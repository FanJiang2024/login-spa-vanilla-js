import { setupClass } from "../../lib";
import classes from "./index.module.css";

export const uiNavbar = (navbar) => {
  navbar.innerHTML = `
    <nav class="nav">
      <ul class="nav-list">
        <li><a class="nav-anchor" href="/home">Home</a></li>
        <li><a class="nav-anchor" href="/about">About</a></li>
      </ul>
    </nav>
    <nav class="nav">
      <ul class="nav-list">
        <li><a class="nav-anchor" href="/account">Account</a></li>
      </ul>
    </nav>
  `;

  setupClass(navbar, classes);
}