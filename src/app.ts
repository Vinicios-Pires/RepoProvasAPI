import express, { json, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routers/index.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const app = express();
app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandlerMiddleware);

app.get("/", async (req: Request, res: Response) => {
	try {
		res.status(200).send("OK!");
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

export default app;
