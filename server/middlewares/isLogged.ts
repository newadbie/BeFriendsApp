import express from "express";
import JwtService from "../services/JwtService";
import TokenService from "../services/JwtService";

const isLogged = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // TODO First i have to create token to check it!
  const { token } = req.cookies ? req.cookies : null;
  if (!token) {
    return next();
  }
  const user = await JwtService.getTokenUser(token);
  if (!user) {
    return next();
  }
  req.body.user = user;
  return next();
};

export default isLogged;
