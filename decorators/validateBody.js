import { HttpError } from '../helpers/index.js';

const validateBody = (schema, customError) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(customError));
    }
    next();
  };

  return func;
};

export default validateBody;