import { Request, Response } from "express";
import { CustomError } from "../../../errors/CustomError";
import { requiredFields } from "../../../utils/requiredFields";
import { DeleteProjectUseCase } from "./DeleteProjectUseCase";

export class DeleteProjectController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    requiredFields({ id });

    const deleteProject = new DeleteProjectUseCase();

    const deletedProject = await deleteProject.handle(id);

    if(!deletedProject) throw new CustomError(400, "There is no project with the given ID.");

    return response.status(200).json({
      message: "Project deleted successfully."
    });
  }
}


