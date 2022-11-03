import { Request, Response } from "express";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

export class CreateTaskController {
  async handle(request: Request, response: Response) {
    const { title, description, deadline, categoryId } = request.body;
    
    const createTask = new CreateTaskUseCase();

    const createdTask = await createTask.handle({ title, description, deadline, categoryId });

    return response.status(200).json(createdTask);
  }
}