import Joi from "joi";

import { createTestData } from "../services/testService.js";

export const testSchema = Joi.object<createTestData>({
	name: Joi.string().required(),
	pdfUrl: Joi.string().required(),
	categoryId: Joi.number().required(),
	teacherDisciplineId: Joi.number().required(),
});
