import { Request, Response } from "express";
import { generateToken } from "../../../utils/generateToken";
import { requiredFields } from "../../../utils/requiredFields";
import { AuthenticateUseCase } from "./AuthenticateUseCase";

export class AuthenticationController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    requiredFields({ email, password });

    const authenticateUseCase = new AuthenticateUseCase();

    const account = await authenticateUseCase.handle({ email, password });

    const token = generateToken(account);

    return response.status(200).json({ account, token });
  }
}