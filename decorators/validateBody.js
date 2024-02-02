import { errorStatus } from "../const/index.js";
import httpError from "../helpers/errorHandlers/httpError.js";

const validateBody = schema => {
    const func = (req, res, next)=> {
        const {error} = schema.validate(req.body);
        if (error) {
            return next(httpError({...errorStatus.BAD_PARAMS, message: error.message}));
        }
        next();
    }

    return func;
}

export default validateBody;
