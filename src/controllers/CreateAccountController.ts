import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { Account } from "../entities/account";

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { email, password, name } = request.body;

    if(!email) return response.status(400).json({ message: "E-mail is required." });
    if(!password) return response.status(400).json({ message: "Password is required." });
    
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const account: Account = await prismaClient.account.create({
        data: {
          email,
          password: encryptedPassword,
          name
        }
      });

      delete account.password;

      const token = generateToken(account);

      return response.status(201).json({
        message: "Account created with success!",
        account,
        token
      });
    } catch(e) {
      console.log("erro", e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") return response.status(409).json({ message: "This e-mail address is already been used." });
      }
    }
  }
}