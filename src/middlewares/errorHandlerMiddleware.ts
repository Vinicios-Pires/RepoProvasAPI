import { NextFunction, Request, Response } from "express";

const ERRORS = {};

export default function errorHandlerMiddleware(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error(err);
	const type: string = err.type;
	let statusCode = ERRORS[type];
	if (!statusCode) statusCode = 500;

	return res.sendStatus(statusCode);
}
