import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { Prisma, Account } from "@prisma/client";

export class FindAccountByIdController {
  async handle(request: Request, response: Response) {
    
    const { id } = request.params;

    try {
      const account: Account | null = await prismaClient.account.findUnique({
        where: {
          id
        }
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete account?.password;

      return response.status(200).json(account);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") return response.status(409).json({ message: "Este endereço de e-mail já está cadastrado." });
      }
      return response.status(400).json({ message: "Não existe uma conta com este id." });
    }
  }
}