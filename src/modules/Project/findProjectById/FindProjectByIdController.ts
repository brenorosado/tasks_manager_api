import { Request, Response } from "express";
import { FindProjectByIdUseCase } from "./FindProjectByIdUseCase";

export class FindProjectByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { requestingUser } = request.body;

    const findProjectById = new FindProjectByIdUseCase();

    const project = await findProjectById.handle(id, requestingUser);

    return response.status(200).json(project);
  }
}


