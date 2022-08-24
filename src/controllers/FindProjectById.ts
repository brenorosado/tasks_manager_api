import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FindProjectById {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const project = await prismaClient.project.findUnique({
        where: {
          id
        }
      });

      response.status(200).json(project);
    } catch (e) {
      console.log("e", e);
    }
  }
}


