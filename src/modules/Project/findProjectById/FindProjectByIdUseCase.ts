import { Project } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";
import { RequestingUser } from "../../../middlewares/auth";

export class FindProjectByIdUseCase {
  async handle(id: string, requestingUser: RequestingUser) {
    
    const projects: Project[] = await prismaClient.project.findMany({
      where: {
        id,
        userId: requestingUser.account.id
      }
    });

    if(projects.length === 0) 
      throw new CustomError(404, "There is no project with the given ID.");

    return projects[0];
  }
}


