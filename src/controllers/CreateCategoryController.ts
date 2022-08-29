import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { Category } from "@prisma/client";

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, projectId } = request.body;

    try {
      const category: Category = await prismaClient.category.create({
        data: {
          name,
          project: {
            connect: {
              id: projectId
            }
          }
        }
      });

      return response.status(200).json(category);
        
    } catch (e) {
      console.log("erro", e);
    }
  }
}


