import { Request, Response } from "express";
import { FindTasksByProjectUseCase } from "./FindTasksByProjectUseCase";

export class FindTasksByProjectController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    
    const getTasksOfProject = new FindTasksByProjectUseCase();

    const projectTasks = await getTasksOfProject.handle(id);

    return response.status(200).json(projectTasks);
  }
}
