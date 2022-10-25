import { Request, Response } from "express";
import { requiredFields } from "../../../utils/requiredFields";
import { CreateProjectUseCase } from "./CreateProjectUseCase";
import { InternalServerError } from "../../../errors/InternalServerError";

export class CreateProjectController {
  async handle(request: Request, response: Response) {
    const { 
      name,
      icon,
      requestingUser
    } = request.body;
    
    requiredFields({ name, icon, requestingUser });

    const createProjet = new CreateProjectUseCase();

    const project = await createProjet.handle({ name, icon, requestingUser });

    if(!project) throw new InternalServerError("Something went wrong.");
    
    return response.json({ project });
  }
}


