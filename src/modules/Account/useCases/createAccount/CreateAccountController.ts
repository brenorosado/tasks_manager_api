import { Request, Response } from "express";
import { generateToken } from "../../../../utils/generateToken";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { email, password, name } = request.body;

    const createAccountUseCase = new CreateAccountUseCase();

    const account = await createAccountUseCase.handle({
      email,
      password,
      name
    });

    const token = generateToken(account);

    return response.status(201).json({
      account,
      token
    });    
  }
}