import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schemas/authSchema.js";

import * as authController from "./../controllers/authController.js";

const authRouter = Router();

authRouter.post(
	"/signup",
	validateSchemaMiddleware(signUpSchema),
	authController.signup
);

authRouter.post("/signin", authController.signin);

export default authRouter;
