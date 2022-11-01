import { prismaClient } from "../../../database/prismaClient";
import { requiredFields } from "../../../utils/requiredFields";

export class CreateCategoryUseCase {
  async handle(name: string, projectId: string) {

    requiredFields({ name, projectId });

    const category = prismaClient.category.create({
      data: {
        name,
        project: {
          connect: {
            id: projectId
          }
        }
      }
    });

    return category;
  }
}


