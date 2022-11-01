import { prismaClient } from "../../../database/prismaClient";

export class DeleteCategoryUseCase {
  async handle(id: string) {
    
    const deletedCategory = await prismaClient.category.delete({
      where: {
        id
      }
    });

    return deletedCategory;
  }
}