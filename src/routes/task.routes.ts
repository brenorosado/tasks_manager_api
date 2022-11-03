import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateTaskController } from "../modules/Task/CreateTask/CreateTaskController";
import { DeleteTaskController } from "../modules/Task/DeleteTask/DeleteTaskController";
import { FindTasksByProjectController } from "../modules/Task/FindTasksByProject/FindTasksByProjectController";
import { UpdateTaskController } from "../modules/Task/UpdateTask/UpdateTaskController";
import { routeAdapter } from "../utils/routerAdapter";

const taskRouter = Router();

const getTasksByProject = new FindTasksByProjectController();
const createTask = new CreateTaskController();
const deleteTask = new DeleteTaskController();
const updateTask = new UpdateTaskController();

taskRouter.get("/project/:id", auth, routeAdapter(getTasksByProject.handle));
taskRouter.post("/", auth, routeAdapter(createTask.handle));
taskRouter.put("/", auth, routeAdapter(updateTask.handle));
taskRouter.delete("/:id", auth, routeAdapter(deleteTask.handle));

export { taskRouter };