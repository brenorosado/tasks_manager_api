import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { Category } from "@prisma/client";

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, requestingUser } = request.body;

    try {
      const category: Category = await prismaClient.category.create({
        data: {
          name,
          user: {
            connect: {
              id: requestingUser.account.id
            }
          }
        }
      });

      response.status(200).json(category);
        
    } catch (e) {
      console.log("erro", e);
    }
  }
}


