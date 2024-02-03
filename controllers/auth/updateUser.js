import bcrypt from 'bcryptjs';

import { User } from '../../models/index.js';
import { userStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

export const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  let data = req.body;
  if (password !== undefined) {
    const hashPassword = await bcrypt.hash(password, 10);
    data = { ...req.body, password: hashPassword };
  }

  const updatedUser = await User.findOneAndUpdate(_id, data);
  if (!updatedUser) {
    throw HttpError(userStatus.USER_NOT_UPDATED);
  }

  res.status(userStatus.USER_UPDATE.status).json({
    ...userStatus.USER_UPDATE,
    data: {
      user: {
        userName: updatedUser.userName,
        email: updatedUser.email,
        theme: updatedUser.theme,
        avatarCloudURL: updatedUser.avatarCloudURL,
      },
    },
  });
};
