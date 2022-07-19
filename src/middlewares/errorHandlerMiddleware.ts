import { NextFunction, Request, Response } from "express";

const ERRORS = {
	unprocessable_entity: 422,
	unauthorized: 401,
	conflict: 409,
	not_found: 404,
	bad_request: 400,
};

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
