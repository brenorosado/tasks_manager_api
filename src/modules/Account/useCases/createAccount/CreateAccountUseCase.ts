import { prismaClient } from "../../../../database/prismaClient";
import { CreateAccountDTO } from "../../dtos/CreateAccountDTO";
import bcrypt from "bcryptjs";
import { Account } from "@prisma/client";
import { BadRequest } from "../../../../errors/BadRequest";
import { InternalServerError } from "../../../../errors/InternalServerError";

export class CreateAccountUseCase {
  async handle(account: CreateAccountDTO) {
    const { email, password, name } = account;

    if(!email) throw new BadRequest("E-mail is required");
    if(!password) throw new BadRequest("Password is required");
    if(!name) throw new BadRequest("Name is required");

    const emailExists = await prismaClient.account.findUnique({
      where: {
        email
      }
    });

    if (emailExists) throw new BadRequest(
      "E-mail already registered."
    );

    const encryptedPassword = await bcrypt.hash(password, 10);
    
    const newAccount: Account = await prismaClient.account.create({
      data: {
        ...account,
        password: encryptedPassword
      }
    });

    if(!newAccount) throw new InternalServerError(
      "Something went wrong while creating an account."
    );

    delete newAccount.password;

    return newAccount;
  }
}


