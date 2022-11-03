import { prismaClient } from "../../../database/prismaClient";

export class DeleteTaskUseCase {
  async handle(id: string) {
    
    const deletedTask = await prismaClient.task.delete({
      where: {
        id
      }
    });

    return deletedTask;
  }
}