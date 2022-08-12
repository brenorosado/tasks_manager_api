import { Router } from "express";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { FindAccountByIdController } from "./controllers/FindAccountByIdController";
import { auth } from "./middlewares/auth";
import { CreateCategory } from "./controllers/CreateCategory";

const router = Router();

const createAccount = new CreateAccountController();
const authenticate = new AuthenticationController();
const findAccountById = new FindAccountByIdController();
const createCategory = new CreateCategory();

router.post("/accounts", createAccount.handle);
router.post("/authenticate", authenticate.handle);

router.get("/accounts/:id", auth, findAccountById.handle);
router.post("/categories", auth, createCategory.handle);

export { router };