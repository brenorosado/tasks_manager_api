import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { Account } from "../entities/account";
import { BadRequest } from "../errors/BadRequest";
import { InternalServerError } from "../errors/InternalServerError";

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { email, password, name } = request.body;

    if(!email) throw new BadRequest("E-mail is required");
    if(!password) throw new BadRequest("Password is required");
    if(!name) throw new BadRequest("Name is required");
    
    const encryptedPassword = await bcrypt.hash(password, 10);

    const account: Account = await prismaClient.account.create({
      data: {
        email,
        password: encryptedPassword,
        name
      }
    });

    if(!account) throw new InternalServerError("Something went wrong while creating an account.");

    delete account.password;

    const token = generateToken(account);

    return response.status(201).json({
      account,
      token
    });    
  }
}