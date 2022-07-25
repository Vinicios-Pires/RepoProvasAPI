import app from "../app.js";
import supertest from "supertest";
import prisma from "./../config/database.js";

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

const authBody = {
	email: "user@user.com",
	password: "user",
};

describe("post /signup", () => {
	it("given a valid req.body it should return 201", async () => {
		const body = {
			email: authBody.email,
			password: authBody.password,
			confirmPassword: authBody.password,
		};

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		const userCreated = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		expect(status).toEqual(201);
		expect(userCreated).not.toBeNull();
	});

	it("given an email already in use and password it should return 409", async () => {
		const body = {
			email: authBody.email,
			password: authBody.password,
			confirmPassword: authBody.password,
		};

		await supertest(app).post("/signup").send(body);
		const userCreated = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});
		expect(userCreated).not.toBeNull();

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		expect(status).toEqual(409);
	});

	it("given a invalid req.body it should return 422", async () => {
		const body = {};

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		expect(status).toEqual(422);
	});
});

describe("post /signin", () => {
	it("given a valid req.body it should return a token", async () => {
		const signUpBody = {
			email: authBody.email,
			password: authBody.password,
			confirmPassword: authBody.password,
		};

		const signInBody = {
			email: authBody.email,
			password: authBody.password,
		};

		await supertest(app).post("/signup").send(signUpBody);
		const userCreated = await prisma.user.findFirst({
			where: {
				email: signUpBody.email,
			},
		});
		expect(userCreated).not.toBeNull();

		const result = await supertest(app).post("/signin").send(signInBody);
		const status = result.status;
		expect(status).toEqual(200);
	});

	it("given an email not yet registered should return status 401", async () => {
		const signInBody = {
			email: authBody.email,
			password: authBody.password,
		};

		const result = await supertest(app).post("/signin").send(signInBody);
		const status = result.status;
		expect(status).toEqual(401);
	});

	it("given a invalid req.body it should return 422", async () => {
		const body = {};

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		expect(status).toEqual(422);
	});
});

afterAll(async () => {
	await prisma.$disconnect();
});
