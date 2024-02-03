import Joi from "joi";
import { commonUserValidator } from "../../../const/index.js";

const userSigninSchema = Joi.object({
    email: Joi.string().pattern(commonUserValidator.EMAIL_REGEXP).required(),
    password: Joi.string().min(6).required(),
})

export default userSigninSchema;
