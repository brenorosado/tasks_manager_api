import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    const { id } = request.query;

    try {
      await prismaClient.category.update({
        where: {
          id: id as string
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


