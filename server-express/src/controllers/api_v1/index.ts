import express from "express";
import { loginController } from "./login";
import { accountController } from "./account";

export const apiV1 = express.Router();

apiV1.use("/login", loginController);
apiV1.use("/account", accountController);