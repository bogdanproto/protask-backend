import Joi from 'joi';

// ============================================================

export const columnGetAllSchema = Joi.object({
  board: Joi.string()
    .length(24)
    .required()
    .messages({ 'any.required': 'missing required BOARD field' }),
});

export const columnAddSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(60)
    .required()
    .messages({ 'any.required': 'missing required TITLE field' }),
  board: Joi.string()
    .length(24)
    .required()
    .messages({ 'any.required': 'missing required BOARD field' }),
});

export const columnUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(60),
  board: Joi.string().length(24),
});
