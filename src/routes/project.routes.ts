import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateProjectController } from "../modules/Project/createProject/CreateProjectController";
import { DeleteProjectController } from "../modules/Project/deleteProject/DeleteProjectController";
import { routeAdapter } from "../utils/routerAdapter";

const projectRouter = Router();

const createProject = new CreateProjectController();
const deleteProject = new DeleteProjectController();

projectRouter.post("/", auth, routeAdapter(createProject.handle));
projectRouter.delete("/:id", auth, routeAdapter(deleteProject.handle));

export { projectRouter };