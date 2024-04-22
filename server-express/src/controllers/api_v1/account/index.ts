import express from "express";
import { accountInfo } from "../../../middlewares/account-info";
import { jwtToken } from "../../../../lib";

export const accountController = express.Router();

accountController.get("/info", accountInfo, (req, res, next) => {
  // @ts-ignore
  const { phone, fingerPrint } = req.user;
  res.set(
    "Authorization",
    "bearer " +
      jwtToken({
        phone,
        fingerPrint,
      }, {
        expiresIn: "1d"
      })
  );
  res.status(200).json({
    code: 200,
    phone,
  })
});