import { Request, Response } from "express";

import * as authService from "./../services/authService.js";

import { userData } from "./../services/authService.js";

export async function signup(req: Request, res: Response) {
	// receber o req.body -> email, password, confirmPassword
	const userData: userData = req.body;

	await authService.signup(userData);

	res.sendStatus(201); //created
}

export async function signin(req: Request, res: Response) {
	const userData: userData = req.body;

	const token = await authService.signin(userData);

	res.status(200).send(token);
}
