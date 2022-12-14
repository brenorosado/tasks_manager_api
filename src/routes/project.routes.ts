import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateProjectController } from "../modules/Project/createProject/CreateProjectController";
import { DeleteProjectController } from "../modules/Project/deleteProject/DeleteProjectController";
import { FindProjectByIdController } from "../modules/Project/findProjectById/FindProjectByIdController";
import { FindProjectsByUserController } from "../modules/Project/findProjectsByUser/FindProjectsByUserController";
import { UpdateProjectController } from "../modules/Project/updateProject/UpdateProjectController";
import { routeAdapter } from "../utils/routerAdapter";

const projectRouter = Router();

const createProject = new CreateProjectController();
const updateProject = new UpdateProjectController();
const deleteProject = new DeleteProjectController();
const findProjectsByUser = new FindProjectsByUserController();
const findProjectById = new FindProjectByIdController();

projectRouter.get("/", auth, routeAdapter(findProjectsByUser.handle));
projectRouter.get("/:id", auth, routeAdapter(findProjectById.handle));
projectRouter.post("/", auth, routeAdapter(createProject.handle));
projectRouter.put("/", auth, routeAdapter(updateProject.handle));
projectRouter.delete("/:id", auth, routeAdapter(deleteProject.handle));

export { projectRouter };