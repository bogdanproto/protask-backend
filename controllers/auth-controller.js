import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import User from "../models/User.js";

import { userStatus, successStatus } from "../const/index.js";
import httpError from "../helpers/errorHandlers/httpError.js";
import { ctrlWrapper } from "../decorators/index.js";

const {JWT_SECRET} = process.env;

const signup = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw httpError(userStatus.USER_CONFLICT);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    const { _id: id } = newUser;
    const payload = {
        id
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, {token});

    res.status(successStatus.CREATED.status).json({
        ...successStatus.CREATED,
        "data": {
            "user": {
                "userName": newUser.userName,
                "email": newUser.email,
                "theme": newUser.theme,
            },
            token,
        }
    })
}

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw httpError(userStatus.USER_UNAUTHORIZED);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    
    if (!passwordCompare) {
        throw httpError(userStatus.USER_UNAUTHORIZED);
    }

    const {_id: id} = user;
    const payload = {
        id
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, {token});

    res.status(userStatus.USER_LOGIN.status).json({
        ...userStatus.USER_LOGIN,
        "data": {
            user: {
                "userName": user.userName,
                "email": user.email,
                "theme": user.theme,
                "avatarCloudURL": user.avatarCloudURL,
            },
            token,
        }
    })
}

const getCurrent = async(req, res)=> {
    const {userName, email, theme, avatarCloudURL} = req.user;

    res.status(userStatus.USER_CURRENT.status).json({
        ...userStatus.USER_CURRENT,
        data: {
            user: {
                userName,
                email,
                theme,
                avatarCloudURL,
            },
        }
    })
}

const signout = async(req, res)=> {
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
    signout: ctrlWrapper(signout),
    updateUser: ctrlWrapper(updateUser),
}
