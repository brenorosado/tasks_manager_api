import { prismaClient } from "../../../database/prismaClient";

export class FindTasksByProjectUseCase {
  async handle(projectId: string) {
    
    const tasksFromProject = await prismaClient.category.findMany({
      where: {
        projectId: projectId as string,
        deleted: false
      },
      orderBy: {
        createdAt: "asc"
      },
      include: {
        tasks: true
      }
    });

    return tasksFromProject;
  }
}
