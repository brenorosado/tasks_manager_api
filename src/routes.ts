import { Router } from "express";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { FindAccountByIdController } from "./controllers/FindAccountByIdController";
import { auth } from "./middlewares/auth";

const router = Router();

const createAccount = new CreateAccountController();
const authenticate = new AuthenticationController();
const findAccountById = new FindAccountByIdController();

router.post("/accounts", createAccount.handle);
router.post("/authenticate", authenticate.handle);
router.get("/accounts/:id", auth, findAccountById.handle);

export { router };