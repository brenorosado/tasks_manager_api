import { Request, Response } from "express";
import { FindAccountByIdUseCase } from "../../Account/findAccountById/FindAccountByIdUseCase";

export class FindProjectsByUserController {
  async handle(request: Request, response: Response) {
    const { requestingUser } = request.body;
    
    const { account } = requestingUser;

    const findProjectsByUser = new FindAccountByIdUseCase();

    const projects = findProjectsByUser.handle(account.id);

    return response.status(200).json(projects);
  }
}