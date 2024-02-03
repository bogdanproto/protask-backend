import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config";
import jimp from "jimp";

import User from "../models/User.js";

import { apiPath, authPath, userStatus, successStatus, emailData } from "../const/index.js";
import { HttpError, sendEmail } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const {JWT_SECRET, BASE_URL} = process.env;

const avatarsPath = path.resolve("public", "avatars");
const verifyEmailLink = BASE_URL + apiPath + authPath.BASE + authPath.VERIFY;

const signup = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(userStatus.USER_CONFLICT);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();
    const newUser = await User.create({ ...req.body, password: hashPassword, verificationCode });
    const verifyEmail = {
        to: email,
        subject: emailData.SUBJECT,
        html: `<a target="_blank" href="${verifyEmailLink}/${verificationCode}">${emailData.LINK_TEXT}</a>`
    }
    await sendEmail(verifyEmail);

    res.status(successStatus.CREATED.status).json({
        ...successStatus.CREATED,
        "data": {
            "user": {
                "userName": newUser.userName,
                "email": newUser.email,
                "theme": newUser.theme,
            }
        }
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    console.log(verificationCode);
    const user = await User.findOne({ verificationCode });
    if(!user) {
        throw HttpError(userStatus.USER_NOT_FOUND);
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

    res.status(successStatus.GET.status).json({
        ...successStatus.GET,
        message: "Verification successful",
    })
}

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(userStatus.USER_NOT_FOUND);
    }
    if (user.verify) {
        throw HttpError(userStatus.USER_ALREADY_VERIFIED);
    }

    const verifyEmail = {
        to: email,
        subject: emailData.SUBJECT,
        html: `<a target="_blank" href="${verifyEmailLink}/${user.verificationCode}">Click to verify email</a>`,
    }

    await sendEmail(verifyEmail);

    res.status(successStatus.UPDATED.status).json({
        ...successStatus.UPDATED,
        message: "Verification email sent"
    });
}

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(userStatus.USER_UNAUTHORIZED);
    }

    if(!user.verify) {
        throw HttpError(userStatus.USER_UNVERIFIED);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    
    if (!passwordCompare) {
        throw HttpError(userStatus.USER_UNAUTHORIZED);
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
        "data": {
            "user": {
                "userName": userName,
                "email": email,
                "theme": theme,
                "avatarCloudURL": avatarCloudURL,
            }
        }
    })
}

const signout = async(req, res)=> {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(userStatus.USER_LOGOUT.status).json(userStatus.USER_LOGOUT);
}

const avatar = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);

    const image = await jimp.read(oldPath);

    await image.resize(250, 250);

    await image.writeAsync(oldPath);

    await fs.rename(oldPath, newPath);

    const avatar = path.join("avatars", filename);
    const result = await User.findOneAndUpdate(_id, { avatarURL: avatar });
    if (!result) {
        throw HttpError(404, `Could not update user with id=${_id}`);
    }

    res.json({
        "avatarURL": result.avatarURL
    })
}

export default {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    avatar: ctrlWrapper(avatar)
}
