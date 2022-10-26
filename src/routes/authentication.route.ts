import { Router } from "express";
import { AuthenticationController } from "../modules/Authentication/authenticate/AuthenticateController";
import { routeAdapter } from "../utils/routerAdapter";

const authenticationRouter = Router();

const authenticate = new AuthenticationController();

authenticationRouter.post("/", routeAdapter(authenticate.handle));

export { authenticationRouter };