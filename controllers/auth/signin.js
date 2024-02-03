import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { User } from '../../models/index.js';

import { userStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

const { JWT_SECRET } = process.env;

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(userStatus.USER_UNAUTHORIZED);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(userStatus.USER_UNAUTHORIZED);
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
  await User.findByIdAndUpdate(id, { token });

  res.status(userStatus.USER_LOGIN.status).json({
    ...userStatus.USER_LOGIN,
    data: {
      user: {
        userName: user.userName,
        email: user.email,
        theme: user.theme,
        avatarCloudURL: user.avatarCloudURL,
      },
      token,
    },
  });
};
