const HttpError = ({ status, code, message }) => {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
};

export default HttpError;
