import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class UpdateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, id } = request.body;
    
    try {
      const updatedCategory = await prismaClient.category.update({
        where: {
          id
        },
        data: {
          name
        }
      });

      return response.status(200).json(updatedCategory);
    } catch (e) {
      console.log(e);
    }
  }
}


