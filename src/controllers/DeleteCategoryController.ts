import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await prismaClient.category.update({
        where: {
          id
        },
        data: {
          deleted: true
        }
      });

      return response.status(200).json({ message: "Category deleted" });
    } catch (e) {
      console.log(e);
    }
  }
}


