import { NextFunction, Response, Request } from "express";

export const simpleCors = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  // 跨域请求中需要暴露出一部分请求头，否则前端访问不到
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
}