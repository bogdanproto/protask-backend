import { ctrlWrapper } from "../decorators/index.js";
import {signup, signin, getCurrent, logout, updateUser} from "./auth/index.js";

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUser: ctrlWrapper(updateUser),
}
