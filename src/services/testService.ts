import * as testRepository from "./../repositories/testRepository.js";

import { Test } from "@prisma/client";

export type createTestData = Omit<Test, "id">;

export async function createTest(test: createTestData) {
	if (!test) throw { type: "unprocessable_entity" };

	await testRepository.createTest(test);
}

export async function findTestsByDisciplines() {
	const tests = await testRepository.findTestsByDisciplines();

	return tests;
}

export async function findTestsByTeachers() {
	const tests = await testRepository.findTestsByTeachers();

	return tests;
}
