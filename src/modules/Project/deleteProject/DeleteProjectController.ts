import { Request, Response } from "express";
import { requiredFields } from "../../../utils/requiredFields";
import { DeleteProjectUseCase } from "./DeleteProjectUseCase";

export class DeleteProjectController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    requiredFields({ id });

    const deleteProject = new DeleteProjectUseCase();

    await deleteProject.handle(id);

    return response.status(200).json({
      message: "Project deleted successfully."
    });
  }
}


