import { Router } from "express";
import { auth } from "../middlewares/auth";
import { FindTasksByProjectController } from "../modules/Task/FindTasksByProject/FindTasksByProjectController";
import { routeAdapter } from "../utils/routerAdapter";

const taskRouter = Router();

const getTasksByProject = new FindTasksByProjectController();

taskRouter.get("/project/:id", auth, routeAdapter(getTasksByProject.handle));

export { taskRouter };