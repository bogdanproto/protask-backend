import Joi from 'joi';
import { commonUserValidator } from '../../../const/index.js';

export const userUpdateSchema = Joi.object({
  userName: Joi.string().min(2),
  password: Joi.string().min(6),
  email: Joi.string().pattern(commonUserValidator.EMAIL_REGEXP),
  theme: Joi.string().valid(...commonUserValidator.THEME_LIST),
});

export const userThemeSchema = Joi.object({
  theme: Joi.string()
    .valid(...commonUserValidator.THEME_LIST)
    .required(),
});

export const userProfileSchema = Joi.object({
  userName: Joi.string().min(2),
  email: Joi.string().pattern(commonUserValidator.EMAIL_REGEXP),
  newPassword: Joi.string().min(8),
  currentPassword: Joi.string().min(8),
});
