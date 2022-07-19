import { Request, Response, NextFunction } from "express";
import { verifytoken } from "../services/authService.js";

export async function ensureAuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authorization = req.headers.authorization || "";
	const token = authorization?.replace("Bearer ", "");

	if (!token) res.sendStatus(401);

	let user: any;

	try {
		user = await verifytoken(token);
	} catch (err) {
		console.error(err);
		res.sendStatus(401);
	}

	res.locals.user = user;
	next();
}
