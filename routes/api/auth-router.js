import express from 'express';

import { authPath } from '../../const/index.js';
import authController from '../../controllers/auth-controller.js';
import { authenticate, isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
  userUpdateSchema,
} from '../../models/User.js';

// ============================================================

const authRouter = express.Router();

authRouter.post(
  authPath.SIGN_UP,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.get(authPath.VERIFY_CODE, authController.verify);

authRouter.post(
  authPath.VERIFY,
  validateBody(userEmailSchema),
  authController.resendVerifyEmail
);

authRouter.post(
  authPath.SIGN_IN,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get(authPath.CURRENT, authenticate, authController.getCurrent);

authRouter.post(authPath.SIGNOUT, authenticate, authController.signout);

authRouter.patch(
  authPath.ROOT,
  authenticate,
  isEmptyBody,
  validateBody(userUpdateSchema),
  authController.updateUser
);

// authRouter.patch(
//   authPath.AVATARS,
//   authenticate,
//   upload.single('avatar'),
//   authController.changeAvatar
// );

export default authRouter;
