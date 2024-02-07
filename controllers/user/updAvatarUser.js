import { userStatus } from '../../const/index.js';
import {
  deleteFile,
  handleAvatarFile,
  uploadAvatarToCloud,
} from '../../helpers/index.js';
import User from '../../models/User.js';

export const updAvatarUser = async (req, res) => {
  const { _id } = req.user;

  const avatarPath = await handleAvatarFile(_id, req.file);
  const avatarCloudURL = await uploadAvatarToCloud(avatarPath);
  await deleteFile(avatarPath);

  const data = await User.findByIdAndUpdate(
    _id,
    { avatarCloudURL },
    {
      new: true,
      select: '-_id avatarCloudURL',
    }
  );

  res.status(userStatus.USER_UPDATE.status).json({
    ...userStatus.USER_UPDATE,
    data,
  });
};
