import { Request, Response } from "express";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase";

export class UpdateTaskController {
  async handle(request: Request, response: Response) {
    const { id, title, description, deadline } = request.body;
    
    const updateTask = new UpdateTaskUseCase();

    const updatedTask = updateTask.handle({ id, title, description, deadline });

    return response.status(200).json(updatedTask);
  }
}