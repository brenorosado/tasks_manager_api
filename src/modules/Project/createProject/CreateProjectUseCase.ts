import { prismaClient } from "../../../database/prismaClient";
import { CreateProjectDTO } from "./CreateProjectDTO";
import { Project } from "@prisma/client";

export class CreateProjectUseCase {
  async handle(projectPayload: CreateProjectDTO) {
    const { name, icon, requestingUser } = projectPayload;

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

    return project;
  }
}