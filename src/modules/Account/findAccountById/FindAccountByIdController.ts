import { Request, Response } from "express";
import { FindAccountByIdUseCase } from "./FindAccountByIdUseCase";

export class FindAccountByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findAccountByIdUseCase = new FindAccountByIdUseCase();

    const account = await findAccountByIdUseCase.handle(id);

    return response.status(200).json(account);
  }
}