import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

export class UpdateCategoryController {
  async handle(request: Request, response: Response) {
    const { id, name } = request.body;

    const updateCategory = new UpdateCategoryUseCase();

    const updatedCategory = await updateCategory.handle(id, name);

    return response.status(200).json(updatedCategory);
  }
}