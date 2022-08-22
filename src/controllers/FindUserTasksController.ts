import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FindUserTasksController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    
    try {
      const categories = await prismaClient.category.findMany({
        where: {
          deleted: false,
          user: {
            id 
          }
        },
        include: {
          tasks: true
        }
      });

      return response.status(200).json(categories);
    } catch (e) {
      console.log(e);
    }
  }
}
