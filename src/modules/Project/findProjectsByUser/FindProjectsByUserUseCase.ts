import { prismaClient } from "../../../database/prismaClient";

export class FindProjectsByUserUseCase {
  async handle(id: string) {
    
    const projects = await prismaClient.project.findMany({
      where: {
        userId: id,
        deleted: false
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    return projects;
  }
}