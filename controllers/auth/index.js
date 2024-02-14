import { signup } from './signup.js';
import { signin } from './signin.js';
import { logout } from './logout.js';
import { updateUser } from './updateUser.js';

import { ctrlWrapper } from '../../decorators/index.js';

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
