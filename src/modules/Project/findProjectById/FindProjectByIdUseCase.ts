import { prismaClient } from "../../../database/prismaClient";

export class FindProjectByIdUseCase {
  async handle(id: string) {
    const project = await prismaClient.project.findUnique({
      where: {
        id
      }
    });

    return project;
  }
}


