import jwt from "jsonwebtoken";
import { Account } from "../entities/account";

export const generateToken = (account: Account) => {
  return jwt.sign({ account }, process.env.JWT_SECRET_KEY as string);
};