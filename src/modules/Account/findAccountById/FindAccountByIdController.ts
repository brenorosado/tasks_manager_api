import { Request, Response } from "express";
import { CustomError } from "../../../errors/CustomError";
import { requiredFields } from "../../../utils/requiredFields";
import { FindAccountByIdUseCase } from "./FindAccountByIdUseCase";

export class FindAccountByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { requestingUser } = request.body;

    console.log("requestingUser", requestingUser);

    requiredFields({ id });

    const findAccountByIdUseCase = new FindAccountByIdUseCase();

    const account = await findAccountByIdUseCase.handle(id);

    if(!account) throw new CustomError(404, "Account not found.");
    if(account.id !== requestingUser.account.id) throw new CustomError(401, "Unauthorized.");

    return response.status(200).json(account);
  }
}