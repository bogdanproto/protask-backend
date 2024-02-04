import Joi from 'joi';

// ============================================================

export const cardGetAllSchema = Joi.object({
  columnId: Joi.string()
    .length(24)
    .required()
    .messages({ 'any.required': 'missing required COLUMNID field' }),
});

export const cardAddSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(60)
    .required()
    .messages({ 'any.required': 'missing required TITLE field' }),
  description: Joi.string(),
  priority: Joi.string(),
  deadline: Joi.date(),
  columnId: Joi.string()
    .length(24)
    .required()
    .messages({ 'any.required': 'missing required COLUMNID field' }),
});

export const cardUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(60),
  description: Joi.string(),
  priority: Joi.string(),
  deadline: Joi.date(),
  columnId: Joi.string().length(24),
});
