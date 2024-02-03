import {Schema, model} from "mongoose";
import Joi from "joi";

import {handleSaveError, addUpdateSettings} from "./hooks.js";

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const themeList = ["light", "dark", "violet"];

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'User name is required'],
        minlength: 2,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
    },
    token: {
        type: String,
    },
    avatarCloudURL: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    },
    theme: {
        type: String,
        enum: themeList,
        default: "light"
    },

}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", addUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
    userName: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": "missing required field email"
    }),
})

export const userUpdateSchema = Joi.object({
    userName: Joi.string().min(2),
    password: Joi.string().min(6),
    email: Joi.string().pattern(emailRegexp),
    theme: Joi.string().valid(...themeList),
})

const User = model("user", userSchema);

export default User;