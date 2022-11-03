import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateCategoryController } from "../modules/Category/CreateCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/Category/DeleteCategory/DeleteCategoryController";
import { UpdateCategoryController } from "../modules/Category/UpdateCategory/UpdateCategoryController";
import { routeAdapter } from "../utils/routerAdapter";

const categoryRouter = Router();

const createCategory = new CreateCategoryController();
const deleteCategory = new DeleteCategoryController();
const updateCategory = new UpdateCategoryController();

categoryRouter.post("/", auth, routeAdapter(createCategory.handle));
categoryRouter.delete("/:id", auth, routeAdapter(deleteCategory.handle));
categoryRouter.put("/", auth, routeAdapter(updateCategory.handle));

export { categoryRouter };