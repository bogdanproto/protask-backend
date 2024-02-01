import handleMongooseErr from './handleMongooseErr.js';
import handleMulterErr from './handleMulterErr.js';

const lineOfFunction =
  (...functions) =>
  err =>
    functions.reduce((result, fn) => fn(result), err);

const handlelibrariesErr = lineOfFunction(handleMulterErr, handleMongooseErr);

export default handlelibrariesErr;
