import { Request, Response } from "express";
import { FindProjectsByUserUseCase } from "./FindProjectsByUserUseCase";

export class FindProjectsByUserController {
  async handle(request: Request, response: Response) {
    const { requestingUser } = request.body;
    
    const { account } = requestingUser;

    const findProjectsByUser = new FindProjectsByUserUseCase();

    const projects = await findProjectsByUser.handle(account.id);

    return response.status(200).json(projects);
  }
}