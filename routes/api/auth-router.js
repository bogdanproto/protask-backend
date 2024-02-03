import express from 'express';

import { authPath } from '../../const/index.js';
import {
  authenticate,
  isEmptyBody,
  validateBody,
} from '../../middlewares/index.js';
import {
  userSignupSchema,
  userSigninSchema,
  userUpdateSchema,
} from '../../schemas/User/joi/index.js';

import authController from '../../controllers/auth/index.js';

// ============================================================

const authRouter = express.Router();

authRouter.post(
  authPath.SIGN_UP,
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  authPath.SIGN_IN,
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get(authPath.CURRENT, authenticate, authController.getCurrent);

authRouter.post(authPath.LOGOUT, authenticate, authController.logout);

authRouter.patch(
  authPath.BASE,
  authenticate,
  isEmptyBody,
  validateBody(userUpdateSchema),
  authController.updateUser
);

export default authRouter;
