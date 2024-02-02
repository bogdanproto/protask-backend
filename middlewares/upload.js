import multer from "multer";
import path from "path";

import { errorStatus } from "../const/index.js";
import httpError from "../helpers/errorHandlers/httpError.js";

const destination = path.resolve("temp");
const storage = multer.diskStorage({
    destination,
    filename: (rec, file, callback) => {
        const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePreffix}_${file.originalname}`
        callback(null, filename);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
    const extention = req.originalname.split(".").pop();
    if (extention === "exe") {
        callback(httpError(
            errorStatus.BAD_FILE_EXTENTION.status,
            `.exe ${errorStatus.BAD_FILE_EXTENTION.message}`,
        ));
    }
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

export default upload;