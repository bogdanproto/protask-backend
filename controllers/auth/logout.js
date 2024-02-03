import User from "../../models/User.js";
import { userStatus } from "../../const/index.js";

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(userStatus.USER_LOGOUT.status).json(userStatus.USER_LOGOUT);
}

export default logout;
