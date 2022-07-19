import prisma from "../config/database.js";

import { userData } from "../services/authService.js";

export async function findUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	return user;
}

export async function createUser(userData: userData, hashedPassword: string) {
	await prisma.user.create({
		data: {
			email: userData.email,
			password: hashedPassword,
		},
	});
}
