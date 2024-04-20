import { Home } from "../pages/home";
import { About } from "../pages/about";
import { NotFound } from "../pages/not-found";
import { Account } from "../pages/account";
import { loginGuard } from "./login-guard";

export const routes = [
  {
    path: "/",
    pageFn: Home,
  },
  {
    path: "/home",
    pageFn: Home,
  },
  {
    path: "/about",
    pageFn: About,
  },
  {
    path: "/account",
    pageFn: Account,
    loader: loginGuard
  },
  {
    path: "/not-found",
    pageFn: NotFound,
  },
];
