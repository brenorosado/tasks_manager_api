import { Request, Response } from "express";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";

export class UpdateProjectController {
  async handle(request: Request, response: Response) {
    const { name, icon, id } = request.body;

    const updateProject = new UpdateProjectUseCase();

    const updatedProject = await updateProject.handle({ name, icon, id });

    return response.status(200).json(updatedProject);
  }
}


