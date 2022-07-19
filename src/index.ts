import express, { json, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();

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

const port = +process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server on in: localhost:${port}/`);
});