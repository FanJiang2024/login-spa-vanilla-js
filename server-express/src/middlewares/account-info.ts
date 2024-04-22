import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const accountInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(403).json({ code: 403, msg: "请登录后重试" });
    return;
  }
  const jwtStr = token.split(/\s+/).pop();
  if (!jwtStr) {
    res.status(403).json({ code: 403, msg: "请登录后重试" });
    return;
  }

  // undefined ???
  console.log(process.env["JWT_SECRET_KEY "]!);
  let result;
  try {
    result = jwt.verify(
      jwtStr,
      process.env["JWT_SECRET_KEY "]! || "123456",
      {
        algorithms: ["HS256"],
      }
    ) as JwtPayload ;
    // @ts-ignore
    req.user = result;
    next();
  } catch(err) {
    res.status(403).json({ code: 403, msg: "请登录后重试" });
    return;
  }
};
