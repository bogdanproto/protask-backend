import { model } from "mongoose";
import Joi from "joi";

import { SchemaMongooseUser } from "../schema/User/index.js";

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const themeList = ["light", "dark", "violet"];

export const userSignupSchema = Joi.object({
    userName: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const userUpdateSchema = Joi.object({
    userName: Joi.string().min(2),
    password: Joi.string().min(6),
    email: Joi.string().pattern(emailRegexp),
    theme: Joi.string().valid(...themeList),
})

const User = model("user", SchemaMongooseUser);

export default User;