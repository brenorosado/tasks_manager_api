import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcrypt from "bcryptjs";
import { Account } from "@prisma/client";
import { generateToken } from "../utils/generateToken";


export class AuthenticationController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if(!email) return response.status(400).json({ message: "E-mail is required." });
    if(!password) return response.status(400).json({ message: "Password is required." });
    
    try {
      const account: Account | null = await prismaClient.account.findUnique({
        where: {
          email
        },
      });
      
      if(!account) return response.status(401).json({ message: "Incorrect username or password!" });

      let validatePassword = false;

      if(account?.password) {
        validatePassword = await bcrypt.compare(password, account.password);
        delete account.password;
      }
      
      if(!validatePassword) response.status(401).json({ message: "Incorrect username or password!" });

      const token = generateToken(account);

      return response.status(200).json({
        message: "Usuário autenticado!",
        account,
        token
      });
    } catch (e) {
      return response.status(400).json({ message: "Unable to perform authentication." });
    }
  }
}