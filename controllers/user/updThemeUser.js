import { userStatus } from '../../const/index.js';
import { User } from '../../models/index.js';

export const updThemeUser = async (req, res) => {
  const { _id: userId } = req.user;
  const { theme } = req.body;

  const data = await User.findByIdAndUpdate(userId, { theme }).select(
    '-_id theme'
  );

  res.status(userStatus.USER_UPDATE.status).json({
    ...userStatus.USER_UPDATE,
    data,
  });
};
