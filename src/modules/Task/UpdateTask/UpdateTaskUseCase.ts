import { prismaClient } from "../../../database/prismaClient";
import { requiredFields } from "../../../utils/requiredFields";
import { UpdateTaskDTO } from "./UpdateTaskDTO";

export class UpdateTaskUseCase {
  async handle({ id, title, description, deadline }: UpdateTaskDTO ) {
    
    requiredFields ({ title });

    const updatedTask = await prismaClient.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        deadline
      }
    });

    return updatedTask;
  }
}