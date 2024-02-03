import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import User from "../../models/User.js";
import { userStatus, successStatus } from "../../const/index.js";
import httpError from "../../helpers/errorHandlers/httpError.js";

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
        data: {
            user: {
                userName: newUser.userName,
                email: newUser.email,
                theme: newUser.theme,
                avatarCloudURL: newUser.avatarCloudURL,
            },
            token,
        }
    })
}

export default signup;