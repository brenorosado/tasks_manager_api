import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateTaskController {
  async handle(request: Request, response: Response) {
    const { title, description, deadline, categoryId } = request.body;

    const convertedDeadline = new Date(deadline).toISOString();

    try {
      const task = await prismaClient.task.create({
        data: {
          title,
          description,
          deadline: convertedDeadline,
          category: {
            connect: {
              id: categoryId
            }
          }
        }
      });

      response.status(200).json(task);
    } catch (e) {
      console.log(e);
    }
  }
}


