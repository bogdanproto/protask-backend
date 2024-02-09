import bcrypt from 'bcryptjs';
import { userStatus } from '../../const/index.js';
import User from '../../models/User.js';
import { HttpError } from '../../helpers/index.js';

export const updProfileUser = async (req, res) => {
  const { _id, password } = req.user;
  const { userName, email, currentPassword, newPassword } = req.body;
  let hashPassword;

  if ((newPassword && !currentPassword) || (!newPassword && currentPassword)) {
    throw HttpError(userStatus.USER_BAD_DATA_PASSWORD);
  }

  if (currentPassword && newPassword) {
    const passwordCompare = await bcrypt.compare(currentPassword, password);

    if (!passwordCompare) {
      throw HttpError(userStatus.USER_UNAUTHORIZED);
    }

    hashPassword = await bcrypt.hash(newPassword, 10);
  }

  const data = await User.findByIdAndUpdate(
    _id,
    { userName, email, password: hashPassword },
    {
      new: true,
      select: '-_id email userName',
    }
  );

  res.status(userStatus.USER_UPDATE.status).json({
    ...userStatus.USER_UPDATE,
    data,
  });
};
