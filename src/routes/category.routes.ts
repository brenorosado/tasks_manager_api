import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateCategoryController } from "../modules/Category/CreateCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/Category/DeleteCategory/DeleteCategoryController";
import { routeAdapter } from "../utils/routerAdapter";

const categoryRouter = Router();

const createCategory = new CreateCategoryController();
const deleteCategory = new DeleteCategoryController();

categoryRouter.post("/", auth, routeAdapter(createCategory.handle));
categoryRouter.delete("/:id", auth, routeAdapter(deleteCategory.handle));

export { categoryRouter };