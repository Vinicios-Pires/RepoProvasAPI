import app from "../app.js";
import supertest from "supertest";
import prisma from "./../config/database.js";

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("post /signup", () => {
	it("given a valid req.body it should return 201", async () => {
		const body = {
			email: "user@user.com",
			password: "user",
			confirmPassword: "user",
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
});

afterAll(async () => {
	await prisma.$disconnect();
});
