import { prismaClient } from "../../../database/prismaClient";
import { requiredFields } from "../../../utils/requiredFields";
import { CreateTaskDTO } from "./CreateTaskDTO";

export class CreateTaskUseCase {
  async handle({ title, description, deadline, categoryId }: CreateTaskDTO) {

    requiredFields({ title, categoryId});

    const createdTask = await prismaClient.task.create({
      data: {
        title, 
        description, 
        deadline,
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    });

    return createdTask;
  }
}


