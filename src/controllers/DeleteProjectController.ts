import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class DeleteProjectController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;
    
    try {
      await prismaClient.project.update({
        where: {
          id
        },
        data: {
          deleted: true
        }
      });

      return response.status(200).json({ message: "Project deleted." });
    } catch (e) {
      console.log(e);
    }
  }
}