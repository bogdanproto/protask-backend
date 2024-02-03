import bcrypt from "bcryptjs";

import User from "../../models/User.js";
import { userStatus } from "../../const/index.js";
import httpError from "../../helpers/errorHandlers/httpError.js";

const updateUser = async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    let data = req.body;
    if (password !== undefined) {
        const hashPassword = await bcrypt.hash(password, 10);
        data = { ...req.body, password: hashPassword };
    }

    const updatedUser = await User.findOneAndUpdate(_id, data);
    if (!updatedUser) {
        throw httpError(userStatus.USER_NOT_UPDATED);
    }

    res.status(userStatus.USER_UPDATE.status).json({
        ...userStatus.USER_UPDATE,
        data: {
            user: {
                userName: updatedUser.userName,
                email: updatedUser.email,
                theme: updatedUser.theme,
                avatarCloudURL: updatedUser.avatarCloudURL,
            },
        }
    });
}

export default updateUser;
