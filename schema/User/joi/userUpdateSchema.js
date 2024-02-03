import Joi from "joi";
import { commonUserValidator } from "../../../const/index.js";

const userUpdateSchema = Joi.object({
    userName: Joi.string().min(2),
    password: Joi.string().min(6),
    email: Joi.string().pattern(commonUserValidator.EMAIL_REGEXP),
    theme: Joi.string().valid(...commonUserValidator.THEME_LIST),
})

export default userUpdateSchema;
