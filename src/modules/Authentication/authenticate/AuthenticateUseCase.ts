import { requiredFields } from "../../../utils/requiredFields";
import { AuthenticateDTO } from "./AuthenticateDTO";
import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";
import bcrypt from "bcryptjs";

export class AuthenticateUseCase {
  async handle(auth: AuthenticateDTO) {
    const { email, password } = auth;

    requiredFields({ email, password });
  
    const account = await prismaClient.account.findUnique({
      where: {
        email
      },
    });
    
    if(!account) throw new CustomError(401, "Incorrect username or password!");

    let validatePassword = false;

    validatePassword = await bcrypt.compare(password, account.password);
    delete account.password;
      
    if(!validatePassword) throw new CustomError(401, "Incorrect username or password!");

    return account;
  }
}