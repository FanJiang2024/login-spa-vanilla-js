import express from "express";
import { getClientIp, jwtToken } from "../../../../lib";
import { getCacheValueByKey, setCacheValue } from "../../../cache";

export const loginController = express.Router();

loginController.post("/by-phone", (req, res, next) => {
  const { fingerPrint, phone, code } = req.body;
  if (!phone || !code) {
    res.status(400).json({
      code: 400,
      msg: "手机号和验证码不能为空",
    });
    return;
  }
  const key = fingerPrint || getClientIp(req);
  if (getCacheValueByKey(key)) {
    res.status(429).json({
      code: 429,
      msg: "请求过于频繁，请稍后重试",
    });
    return;
  }
  setCacheValue(key, 1, 60);
  res.set(
    "Authorization",
    "bearer " +
      jwtToken(
        {
          phone,
          fingerPrint,
        },
        {
          expiresIn: "1d",
        }
      )
  );
  res.status(200).json({
    code: 200,
    data: true,
    msg: "操作成功",
  });
});
