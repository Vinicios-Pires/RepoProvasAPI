import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as authRepository from "./../repositories/authRepository.js";

import { prisma, User } from "@prisma/client";
export type userData = Omit<User, "id">;

export async function signup(userData: userData) {
	if (!userData) throw { type: "unprocessable_entity" }; // req.body preenchido incorretamente

	const userExists = await authRepository.findUserByEmail(userData.email); // verificar se usuario ja existe
	if (userExists) throw { type: "conflict" }; // caso o usuario exista lanca um erro do tipo conflito

	const hash = 12;

	const hashedPassword = bcrypt.hashSync(userData.password, hash);

	await authRepository.createUser(userData, hashedPassword); // caso de sucesso na criacao
}

export async function signin(userData: userData) {
	if (!userData) throw { type: "unprocessable_entity" };

	const user = await authRepository.findUserByEmail(userData.email);

	if (!user || !bcrypt.compareSync(userData.password, user.password)) {
		throw { type: "unauthorized" };
	}

	const token = jwt.sign(
		{
			id: user.id,
		},
		process.env.JWT_SECRET
	);

	return token;
}

export async function verifytoken(token: any) {
	return jwt.verify(token, process.env.JWT_SECRET);
}
