import { signup } from './signup.js';
import { signin } from './signin.js';
import { getCurrent } from './getCurrent.js';
import { logout } from './logout.js';
import { updateUser } from './updateUser.js';

import { ctrlWrapper } from '../../decorators/index.js';

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
