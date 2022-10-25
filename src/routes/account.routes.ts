import { Router } from "express";

import { CreateAccountController } from "../modules/Account/createAccount/CreateAccountController";
import { FindAccountByIdController } from "../modules/Account/findAccountById/FindAccountByIdController";
import { DeleteAccountController } from "../modules/Account/deleteAccount/DeleteAccountController";

import { routeAdapter } from "../utils/routerAdapter";

import { auth } from "../middlewares/auth";

const accountRouter = Router();

const createAccount = new CreateAccountController();
const findAccountById = new FindAccountByIdController();
const deleteAccount = new DeleteAccountController();

accountRouter.post("/", routeAdapter(createAccount.handle));
accountRouter.get("/:id", auth, routeAdapter(findAccountById.handle));
accountRouter.delete("/:id", auth, routeAdapter(deleteAccount.handle));

export { accountRouter };