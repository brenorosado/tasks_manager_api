import { Router } from "express";

import { CreateAccountController } from "../modules/Account/createAccount/CreateAccountController";
import { FindAccountByIdController } from "../modules/Account/findAccountById/FindAccountByIdController";

import { routeAdapter } from "../utils/routerAdapter";

import { auth } from "../middlewares/auth";

const accountRouter = Router();

const createAccount = new CreateAccountController();
const findAccountById = new FindAccountByIdController();

accountRouter.post("/", routeAdapter(createAccount.handle));
accountRouter.get("/:id", auth, routeAdapter(findAccountById.handle));

export { accountRouter };