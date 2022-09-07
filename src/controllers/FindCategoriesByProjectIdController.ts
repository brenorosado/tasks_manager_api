import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FindCategoriesByProjectIdController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.query;

    if (!projectId) return response.status(500).json({ message: "Project not found."});

    try {
      const categoriesWithTasks = await prismaClient.category.findMany({
        where: {
          projectId: projectId as string,
          deleted: false
        },
        orderBy: {
          createdAt: "asc"
        },
        include: {
          tasks: true
        }
      });

      return response.status(200).json(categoriesWithTasks);
    } catch (e) {
      console.log("e", e);
    }
  }
}


