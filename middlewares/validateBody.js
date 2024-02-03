import { errorStatus } from '../const/index.js';
import { HttpError } from '../helpers/index.js';

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(
        HttpError({ ...errorStatus.BAD_PARAMS, message: error.message })
      );
    }
    next();
  };

  return func;
};

export default validateBody;
