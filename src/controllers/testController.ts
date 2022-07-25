import { Request, Response } from "express";

import * as testService from "./../services/testService.js";

import { createTestData } from "./../services/testService.js";

export async function createTest(req: Request, res: Response) {
	const test: createTestData = req.body;

	await testService.createTest(test);

	res.sendStatus(201);
}

export async function findTestsByDisciplines(req: Request, res: Response) {
	const tests = await testService.findTestsByDisciplines();

	res.status(200).send(tests);
}

export async function findTestsByTeachers(req: Request, res: Response) {
	const tests = await testService.findTestsByTeachers();

	res.status(200).send(tests);
}
