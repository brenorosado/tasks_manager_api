import { prismaClient } from "../../../database/prismaClient";
import { CreateAccountDTO } from "./CreateAccountDTO";
import bcrypt from "bcryptjs";
import { Account } from "@prisma/client";
import { InternalServerError } from "../../../errors/InternalServerError";
import { requiredFields } from "../../../utils/requiredFields";
import { CustomError } from "../../../errors/CustomError";

export class CreateAccountUseCase {
  async handle(account: CreateAccountDTO) {
    const { email, password, name } = account;

    requiredFields({ email, password, name});

    const emailExists = await prismaClient.account.findUnique({
      where: {
        email
      }
    });

    if (emailExists) throw new CustomError(409,
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


