import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { HttpError } from '../helpers/index.js';
import { userStatus } from '../const/index.js';

import User from '../models/User.js';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(userStatus.USER_AUTHORIZATION_TOKEN_MISSING));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(userStatus.USER_AUTHORIZATION_TOKEN_MISSING));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || token !== user.token) {
      return next(HttpError(userStatus.USER_UNAUTHORIZED_TOKEN));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(userStatus.USER_UNAUTHORIZED_TOKEN));
  }
};

export default authenticate;
