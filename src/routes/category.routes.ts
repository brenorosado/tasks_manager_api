import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateCategoryController } from "../modules/Category/CreateCategory/CreateCategoryController";
import { routeAdapter } from "../utils/routerAdapter";

const categoryRouter = Router();

const createCategory = new CreateCategoryController();

categoryRouter.post("/", auth, routeAdapter(createCategory.handle));

export { categoryRouter };