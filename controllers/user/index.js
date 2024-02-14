import { ctrlWrapper } from '../../decorators/index.js';
import { getCurrent } from './getCurrent.js';
import { updAvatarUser } from './updAvatarUser.js';
import { updProfileUser } from './updProfileUser.js';
import { updThemeUser } from './updThemeUser.js';

export default {
  getCurrent: ctrlWrapper(getCurrent),
  updThemeUser: ctrlWrapper(updThemeUser),
  updAvatarUser: ctrlWrapper(updAvatarUser),
  updProfileUser: ctrlWrapper(updProfileUser),
};
