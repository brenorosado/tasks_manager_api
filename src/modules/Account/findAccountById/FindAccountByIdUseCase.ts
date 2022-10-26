import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";

export class FindAccountByIdUseCase {
  async handle(id: string) {
    const account = await prismaClient.account.findUnique({
      where: {
        id
      }
    });

    if(!account) throw new CustomError(404, "There is no account with this ID.");

    delete account.password;
  
    return account;
  }
}