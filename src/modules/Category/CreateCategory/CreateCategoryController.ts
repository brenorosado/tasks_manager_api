import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, projectId } = request.body;

    const createCategory = new CreateCategoryUseCase();

    const category = await createCategory.handle(name, projectId);

    return response.status(201).json(category);
  }
}


