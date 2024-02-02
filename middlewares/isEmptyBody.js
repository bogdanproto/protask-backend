import { errorStatus } from "../const/index.js";
import httpError from "../helpers/errorHandlers/httpError.js";

const isEmptyBody = (req, res, next)=> {
    const {length} = Object.keys(req.body);
    if(!length) {
        return next(httpError(errorStatus.BAD_PARAMS.status, errorStatus.BAD_PARAMS.message));
    }
    next();
}

export default isEmptyBody;
