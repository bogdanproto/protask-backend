import multer from 'multer';
import { errorStatus } from '../../const/index.js';

const handleMulterErr = err => {
  if (err instanceof multer.MulterError) {
    err.status = errorStatus.UNSUPPORTED_TYPE.status;
    err.message = err.code;
    return err;
  }

  return err;
};

export default handleMulterErr;
