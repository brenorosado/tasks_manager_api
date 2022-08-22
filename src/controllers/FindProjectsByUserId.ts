import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FindProjectsByUserId {
  async handle(request: Request, response: Response) {
    const { requestingUser } = request.body;

    try {
      const projects = await prismaClient.project.findMany({
        where: {
          userId: requestingUser.account.id
        }
      });

      return response.status(200).json(projects);
    } catch (e) {
      console.log("e", e);
    }
  }
}


