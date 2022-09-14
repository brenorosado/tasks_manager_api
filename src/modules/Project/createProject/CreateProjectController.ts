import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";
import { Project } from "@prisma/client";

export class CreateProjectController {
  async handle(request: Request, response: Response) {
    const { 
      name,
      icon,
      requestingUser
    } = request.body;
    
    try {
      const project: Project = await prismaClient.project.create({
        data: {
          name,
          icon,
          user: {
            connect: {
              id: requestingUser.account.id
            }
          }
        }
      });
    
      response.status(200).json(project);
            
    } catch (e) {
      console.log("erro", e);
    }
  }
}


