import prisma from "../config/database.js";

import { createTestData } from "../services/testService.js";

export async function createTest(test: createTestData) {
	await prisma.test.create({
		data: {
			name: test.name,
			pdfUrl: test.pdfUrl,
			categoryId: test.categoryId,
			teacherDisciplineId: test.teacherDisciplineId,
		},
	});
}

export async function findTestsByDisciplines() {
	const tests = await prisma.term.findMany({
		include: {
			Discipline: {
				include: {
					TeacherDiscipline: {
						include: {
							teacher: true,
							Test: {
								include: {
									category: true,
								},
							},
						},
					},
				},
			},
		},
	});

	return tests;
}

export async function findTestsByTeachers() {
	const tests = prisma.teacherDiscipline.findMany({
		include: {
			teacher: true,
			discipline: true,
			Test: {
				include: {
					category: true,
				},
			},
		},
	});

	return tests;
}
