import { Request, Response } from "express";
import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

export class DeleteTaskController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    
    const deleteTask = new DeleteTaskUseCase();

    await deleteTask.handle(id);

    return response.status(200).json({
      message: "Task deleted successfully."
    });
  }
}