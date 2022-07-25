import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function validateToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer", "").trim();

	if (!token) return res.status(401).send("Must send a token");

	jwt.verify(token, process.env.JWT_SECRET, (e, user) => {
		if (e) return res.status(403).send("Invalid token");
		res.locals.user = user;
	});

	next();
}

// import { Request, Response, NextFunction } from "express";
// import { verifytoken } from "../services/authService.js";

// export async function ensureAuthMiddleware(
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) {
// 	const authorization = req.headers.authorization || "";
// 	const token = authorization?.replace("Bearer ", "");

// 	if (!token) res.sendStatus(401);

// 	let user: any;

// 	try {
// 		user = await verifytoken(token);
// 	} catch (err) {
// 		console.error(err);
// 		res.sendStatus(401);
// 	}

// 	res.locals.user = user;

// 	next();
// }
