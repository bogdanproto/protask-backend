import { User } from '../../models/index.js';
import { userStatus } from '../../const/index.js';

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(userStatus.USER_LOGOUT.status).json(userStatus.USER_LOGOUT);
};
