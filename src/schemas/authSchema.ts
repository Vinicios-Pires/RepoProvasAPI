import Joi from "joi";
// import { createUserData } from "../services/authService.js";

export const signUpSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
