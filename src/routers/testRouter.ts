import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { testSchema } from "../schemas/testSchema.js";

import * as testController from "./../controllers/testController.js";

const testRouter = Router();

testRouter.post(
	"/test",
	ensureAuthMiddleware,
	validateSchemaMiddleware(testSchema),
	testController.createTest
);

testRouter.get(
	"/test/discipline",
	ensureAuthMiddleware,
	testController.findTestsByDisciplines
);

testRouter.get(
	"/test/teacher",
	ensureAuthMiddleware,
	testController.findTestsByTeachers
);

export default testRouter;
