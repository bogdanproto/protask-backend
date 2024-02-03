import bcrypt from "bcryptjs";
import "dotenv/config";

import User from "../models/User.js";

import { userStatus } from "../const/index.js";
import httpError from "../helpers/errorHandlers/httpError.js";
import { ctrlWrapper } from "../decorators/index.js";
import {signup, signin, getCurrent} from "./auth/index.js";

const logout = async(req, res)=> {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(userStatus.USER_LOGOUT.status).json(userStatus.USER_LOGOUT);
}

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

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUser: ctrlWrapper(updateUser),
}
