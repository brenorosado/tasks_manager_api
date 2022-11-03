import { prismaClient } from "../../../database/prismaClient";
import { requiredFields } from "../../../utils/requiredFields";

export class UpdateCategoryUseCase {
  async handle(id: string, name: string) {

    requiredFields({ id, name });

    const updatedCategory = prismaClient.category.update({
      where: {
        id
      },
      data: {
        name
      }
    });

    return updatedCategory;
  }
}