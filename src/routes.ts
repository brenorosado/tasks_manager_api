import { Router } from "express";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { FindAccountByIdController } from "./controllers/FindAccountByIdController";
import { auth } from "./middlewares/auth";
import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { CreateProjectController } from "./controllers/CreateProjectController";
import { FindProjectsByUserId } from "./controllers/FindProjectsByUserId";
import { UpdateProjectController } from "./controllers/UpdateProjectController";
import { FindProjectById } from "./controllers/FindProjectById";
import { FindCategoriesByProjectIdController } from "./controllers/FindCategoriesByProjectIdController";
import { DeleteCategoryController } from "./controllers/DeleteCategoryController";
import { UpdateCategoryController } from "./controllers/UpdateCategoryController";
import { DeleteProjectController } from "./controllers/DeleteProjectController";

const router = Router();

const createAccount = new CreateAccountController();
const authenticate = new AuthenticationController();
const findAccountById = new FindAccountByIdController();


const createProject = new CreateProjectController();
const findProjectById = new FindProjectById();
const findProjectsByUser = new FindProjectsByUserId();
const updateProject = new UpdateProjectController();
const deleteProject = new DeleteProjectController();

const findCategoriesByProjectId = new FindCategoriesByProjectIdController();
const createCategory = new CreateCategoryController();
const updateCategory = new UpdateCategoryController();
const deleteCategory = new DeleteCategoryController();


router.post("/accounts", createAccount.handle);
router.post("/authenticate", authenticate.handle);
router.get("/accounts/:id", auth, findAccountById.handle);

router.get("/projects", auth, findProjectsByUser.handle);
router.get("/projects/:id", auth, findProjectById.handle);
router.put("/projects", auth, updateProject.handle);
router.post("/projects", auth, createProject.handle);
router.delete("/projects", auth, deleteProject.handle);

router.get("/categories", auth, findCategoriesByProjectId.handle);
router.post("/categories", auth, createCategory.handle);
router.put("/categories", auth, updateCategory.handle);
router.delete("/categories", auth, deleteCategory.handle);


export { router };