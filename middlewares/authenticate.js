import jwt from "jsonwebtoken";
import "dotenv/config";

import httpError from "../helpers/errorHandlers/httpError.js";
import { userStatus } from "../const/index.js";

import User from "../models/User.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(httpError(userStatus.USER_AUTHORIZATIION_TOKEN_MISSING));
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        return next(httpError(userStatus.USER_AUTHORIZATIION_TOKEN_MISSING));
    }
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token || token !== user.token) {
            return next(httpError(userStatus.USER_UNAUTHORIZED_TOKEN));
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(httpError({...userStatus.USER_UNAUTHORIZED, "message": error.message}))
    }
}

export default authenticate;