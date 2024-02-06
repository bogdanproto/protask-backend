import { userStatus } from '../../const/index.js';
import User from '../../models/User.js';

export const updProfileUser = async (req, res) => {
  const { _id } = req.user;
  const { userName, email } = req.body;

  const data = await User.findByIdAndUpdate(
    _id,
    { userName, email },
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
