import Joi from 'joi';

export const needHelpSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': `missing required email field`,
  }),
  comment: Joi.string()
    .min(10)
    .max(300)
    .required()
    .messages({
      'any.required': `missing required comment field`,
      'string.min': `Comment should have a minimum 10 symbols`,
      'string.max': `Comment should have a maximum 300 symbols`,
    }),
});

