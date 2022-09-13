import { prismaClient } from "../../../database/prismaClient";

export class FindAccountByIdUseCase {
  async handle(id: string) {
    const account = await prismaClient.account.findUnique({
      where: {
        id
      }
    });

    delete account.password;
  
    return account;
  }
}