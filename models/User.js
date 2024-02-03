import { model } from "mongoose";

import { SchemaMongooseUser } from "../schema/User/index.js";

const User = model("user", SchemaMongooseUser);

export default User;
