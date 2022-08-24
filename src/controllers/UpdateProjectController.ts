import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class UpdateProjectController {
  async handle(request: Request, response: Response) {
    const { name, icon, id } = request.body;

    try {
      const project = await prismaClient.project.update({
        where: {
          id
        },
        data: {
          name,
          icon
        }
      });

      return response.status(200).json(project);
    } catch (e) {
      console.log(e);
    }
  }
}


