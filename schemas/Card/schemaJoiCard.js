import Joi from 'joi';

import { priorityList, objectIdRegexp } from '../../const/index.js';

// ============================================================

export const cardAddSchema = Joi.object({
  title: Joi.string().min(2).max(60).required().messages({
    'any.required': 'Required field "title" cannot be empty',
  }),
  description: Joi.string(),
  priority: Joi.string()
    .valid(...priorityList)
    .messages({
      'any.only':
        'The "priority" field must have a valid value: ["without", "low", "medium", "high"]',
    }),
  deadline: Joi.string(),
  columnId: Joi.string().pattern(objectIdRegexp).required().messages({
    'any.required': 'Required field "columnId" cannot be empty',
    'string.pattern.base':
      'Validation Error. The "columnId" has incorrect format',
  }),
});

export const cardUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(60),
  description: Joi.string(),
  priority: Joi.string()
    .valid(...priorityList)
    .messages({
      'any.only':
        'The "priority" field must have a valid value: ["without", "low", "medium", "high"]',
    }),
  deadline: Joi.string(),
  columnId: Joi.string().pattern(objectIdRegexp).messages({
    'string.pattern.base':
      'Validation Error. The "columnId" has incorrect format',
  }),
});

export const cardChangeColumnSchema = Joi.object({
  columnId: Joi.string().pattern(objectIdRegexp).required().messages({
    'string.pattern.base':
      'Validation Error. The "columnId" has incorrect format',
  }),
});
