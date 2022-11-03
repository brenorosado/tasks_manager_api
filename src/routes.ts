import { Router } from "express";

import { accountRouter } from "./routes/account.routes";
import { authenticationRouter } from "./routes/authentication.routes";
import { projectRouter } from "./routes/project.routes";
import { categoryRouter } from "./routes/category.routes";
import { taskRouter } from "./routes/task.routes";

const router = Router();

router.use("/account", accountRouter);
router.use("/authenticate", authenticationRouter);
router.use("/project", projectRouter);
router.use("/category", categoryRouter);
router.use("/task", taskRouter);

export { router };