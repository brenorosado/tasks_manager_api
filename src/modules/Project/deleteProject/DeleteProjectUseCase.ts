import { prismaClient } from "../../../database/prismaClient";

export class DeleteProjectUseCase {
  async handle(id: string) {

    const deletedProject = await prismaClient.project.delete({
      where: {
        id
      }
    });

    return deletedProject;
  }
}