import Joi from "joi";
import { commonUserValidator } from "../../../const/index.js";

const userSignupSchema = Joi.object({
    userName: Joi.string().min(2).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().pattern(commonUserValidator.EMAIL_REGEXP).required(),
});

export default userSignupSchema;
