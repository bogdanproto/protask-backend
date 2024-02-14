import express from 'express';
import {
  authenticate,
  isEmptyBody,
  upload,
  validateBody,
} from '../../middlewares/index.js';
import {
  userProfileSchema,
  userThemeSchema,
} from '../../schemas/User/joi/index.js';
import { userPath } from '../../const/index.js';
import userCtrl from '../../controllers/user/index.js';

// ============================================================

const userRouter = express.Router();

userRouter.get(userPath.CURRENT, authenticate, userCtrl.getCurrent);

userRouter.patch(
  userPath.THEME,
  authenticate,
  isEmptyBody,
  validateBody(userThemeSchema),
  userCtrl.updThemeUser
);

userRouter.patch(
  userPath.AVATAR,
  authenticate,
  upload.single('avatar'),
  userCtrl.updAvatarUser
);

userRouter.patch(
  userPath.PROFILE,
  authenticate,
  isEmptyBody,
  validateBody(userProfileSchema),
  userCtrl.updProfileUser
);

export default userRouter;
