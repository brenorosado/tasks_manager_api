import { Request, Response } from "express";
import { FindProjectByIdUseCase } from "./FindProjectByIdUseCase";

export class FindProjectByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findProjectById = new FindProjectByIdUseCase();

    const project = await findProjectById.handle(id);

    return response.status(200).json(project);
  }
}


