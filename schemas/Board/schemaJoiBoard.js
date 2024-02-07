import Joi from 'joi';
import { backgroundsList, iconsList } from '../../const/index.js';

// ============================================================

export const boardAddSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(60)
    .required()
    .messages({ 'any.required': 'Required field "title" cannot be empty' }),
  icon: Joi.string()
    .valid(...iconsList)
    .messages({
      'any.only':
        'The "icon" field must have a valid value: [ "project", "star", "loading", "puzzle", "container", "lightning", "colors", "hexagon"]',
    }),
  backgroundImg: Joi.string()
    .valid(...backgroundsList)
    .messages({
      'any.only': 'The "backgroundImg" field must have a valid value',
    }),
});

export const boardUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(60),
  icon: Joi.string()
    .valid(...iconsList)
    .messages({
      'any.only': 'The "icon" field must have a valid value',
    }),
  backgroundImg: Joi.string()
    .valid(...backgroundsList)
    .messages({
      'any.only':
        'The "backgroundImg" field must have a valid value: [ "project", "star", "loading", "puzzle", "container", "lightning", "colors", "hexagon"]',
    }),
});
