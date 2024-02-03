import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';
import { errorStatus } from '../const/index.js';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(errorStatus.BAD_ID));
  }
  next();
};

export default isValidId;
