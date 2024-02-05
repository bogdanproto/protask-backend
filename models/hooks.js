import { errorStatus } from '../const/index.js';

export const handleSaveError = (error, data, next) => {
  error.status = errorStatus.BAD_DATA_MONGOOSE.status;
  next();
};

export const addUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
