import Joi from 'joi';

import { priorityList, objectIdRegexp } from '../../const/index.js';

// ============================================================

export const cardGetAllSchema = Joi.object({
  columnId: Joi.string().pattern(objectIdRegexp).required().messages({
    'any.required': 'Required field "columnId" cannot be empty',
    'string.pattern.base':
      'Validation Error. The parameters of the request are incorrect or have the wrong type',
  }),
});

export const cardAddSchema = Joi.object({
  title: Joi.string().min(2).max(60).required().messages({
    'any.required': 'Required field "title" cannot be empty',
  }),
  description: Joi.string(),
  priority: Joi.string()
    .valid(...priorityList)
    .messages({
      'any.only':
        'The "priority" field must have a valid value: ["without priority", "low", "medium", "high"]',
    }),
  deadline: Joi.date(),
  columnId: Joi.string().pattern(objectIdRegexp).required().messages({
    'any.required': 'Required field "columnId" cannot be empty',
    'string.pattern.base':
      'Validation Error. The parameters of the request are incorrect or have the wrong type',
  }),
});

export const cardUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(60),
  description: Joi.string(),
  priority: Joi.string()
    .valid(...priorityList)
    .messages({
      'any.only':
        'The "priority" field must have a valid value: ["without priority", "low", "medium", "high"]',
    }),
  deadline: Joi.date(),
  columnId: Joi.string().pattern(objectIdRegexp).messages({
    'string.pattern.base':
      'Validation Error. The parameters of the request are incorrect or have the wrong type',
  }),
});

export const cardChangePrioritySchema = Joi.object({
  priority: Joi.string()
    .valid(...priorityList)
    .required()
    .messages({
      'any.required': 'Required field "priority" cannot be empty',
      'any.only':
        'The "priority" field must have a valid value: ["without priority", "low", "medium", "high"]',
    }),
});

export const cardSetDeadlineSchema = Joi.object({
  deadline: Joi.date().required().messages({
    'any.required': 'Required field "deadline" cannot be empty',
  }),
});
