import { Router } from "express";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { FindAccountByIdController } from "./controllers/FindAccountByIdController";
import { auth } from "./middlewares/auth";
import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { CreateTaskController } from "./controllers/CreateTaskController";
import { FindUserTasksController } from "./controllers/FindUserTasksController";

const router = Router();

const createAccount = new CreateAccountController();
const authenticate = new AuthenticationController();
const findAccountById = new FindAccountByIdController();
const createCategory = new CreateCategoryController();
const createTask = new CreateTaskController();
const findTasksByUser = new FindUserTasksController();

router.post("/accounts", createAccount.handle);
router.post("/authenticate", authenticate.handle);
router.get("/accounts/:id", auth, findAccountById.handle);

router.post("/categories", auth, createCategory.handle);
router.post("/tasks", auth, createTask.handle);
router.get("/user/:id/tasks", auth, findTasksByUser.handle);

export { router };