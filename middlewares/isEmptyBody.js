import { errorStatus } from '../const/index.js';
import { HttpError } from '../helpers/index.js';

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(errorStatus.EMPTY_BODY));
  }
  next();
};

export default isEmptyBody;
