import Joi from 'joi';

import { objectIdRegexp } from '../../const/index.js';

// ============================================================

export const columnAddSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(60)
    .required()
    .messages({ 'any.required': 'Required field "title" cannot be empty' }),
  boardId: Joi.string().pattern(objectIdRegexp).required().messages({
    'any.required': 'Required field "boardId" cannot be empty',
    'string.pattern.base':
      'Validation Error. The "boardId" has incorrect format',
  }),
});

export const columnUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(60),
});
