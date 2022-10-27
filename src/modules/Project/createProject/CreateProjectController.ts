import { Request, Response } from "express";
import { requiredFields } from "../../../utils/requiredFields";
import { CreateProjectUseCase } from "./CreateProjectUseCase";

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
    
    return response.status(201).json(project);
  }
}


