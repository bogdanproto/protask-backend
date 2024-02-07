import { ctrlWrapper } from '../../decorators/index.js';
import { updAvatarUser } from './updAvatarUser.js';
import { updProfileUser } from './updProfileUser.js';
import { updThemeUser } from './updThemeUser.js';

export default {
  updThemeUser: ctrlWrapper(updThemeUser),
  updAvatarUser: ctrlWrapper(updAvatarUser),
  updProfileUser: ctrlWrapper(updProfileUser),
};
