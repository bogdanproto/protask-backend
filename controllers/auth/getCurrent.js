import { userStatus } from '../../const/index.js';

export const getCurrent = async (req, res) => {
  const { userName, email, theme, avatarCloudURL } = req.user;

  res.status(userStatus.USER_CURRENT.status).json({
    ...userStatus.USER_CURRENT,
    data: {
      user: {
        userName,
        email,
        theme,
        avatarCloudURL,
      },
    },
  });
};
