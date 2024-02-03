import Joi from 'joi';

// ============================================================

export const boardAddSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({ 'any.required': 'missing required TITLE field' }),
  icon: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required ICON field' }),
});

export const boardUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(30),
  icon: Joi.string(),
});

export const boardUpdateBackgroundSchema = Joi.object({
  backgroundImg: Joi.string().required(),
});
