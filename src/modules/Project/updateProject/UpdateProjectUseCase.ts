import { prismaClient } from "../../../database/prismaClient";
import { UpdateProjectDTO } from "./UpdateProjectDTO";

export class UpdateProjectUseCase {
  async handle({ name, icon, id }: UpdateProjectDTO) {
    const updatedProject = await prismaClient.project.update({
      where: {
        id
      },
      data: {
        name,
        icon
      }
    });

    return updatedProject;
  } 
}