import { Router } from "express";
// import validateToken from "../middlewares/ensureAuthMiddleware.js";
// import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { testSchema } from "../schemas/testSchema.js";

import * as testController from "./../controllers/testController.js";

const testRouter = Router();

// testRouter.use(ensureAuthMiddleware);
// testRouter.use(validateToken);

testRouter.post(
	"/test",
	validateSchemaMiddleware(testSchema),
	testController.createTest
);

testRouter.get("/test/disciplines", testController.findTestsByDisciplines);

testRouter.get("/test/teachers", testController.findTestsByTeachers);

export default testRouter;
