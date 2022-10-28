import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateProjectController } from "../modules/Project/createProject/CreateProjectController";
import { DeleteProjectController } from "../modules/Project/deleteProject/DeleteProjectController";
import { UpdateProjectController } from "../modules/Project/updateProject/UpdateProjectController";
import { routeAdapter } from "../utils/routerAdapter";

const projectRouter = Router();

const createProject = new CreateProjectController();
const updateProject = new UpdateProjectController();
const deleteProject = new DeleteProjectController();

projectRouter.post("/", auth, routeAdapter(createProject.handle));
projectRouter.put("/", auth, routeAdapter(updateProject.handle));
projectRouter.delete("/:id", auth, routeAdapter(deleteProject.handle));

export { projectRouter };