import { Request, Response } from "express";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

export class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCategory = new DeleteCategoryUseCase();

    await deleteCategory.handle(id);

    return response.status(200).json({
      message: "Category deleted successfully."
    });
  }
}
