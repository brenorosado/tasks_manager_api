import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Account } from "../entities/account";

interface ProjectRequest extends Request {
  requestingUser?: Account;
}

export const auth = (request: ProjectRequest, response: Response, next: NextFunction) => {
  const token = request.headers["authorization"];

  if (!token) return response.status(403).json({ message: "O token é necessário para autenticação."});
  
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY as string);
    request.requestingUser = decoded as Account;
  } catch (err) {
    return response.status(401).json({ message: "Token de autenticação inválido."});
  }
  return next();
};