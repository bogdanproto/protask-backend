import { Schema } from 'mongoose';
import { commonUserValidator } from '../../../const/index.js';

const SchemaMongooseUser = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'User name is required'],
      minlength: 2,
    },
    email: {
      type: String,
      match: commonUserValidator.EMAIL_REGEXP,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 8,
    },
    token: {
      type: String,
    },
    avatarCloudURL: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      enum: commonUserValidator.THEME_LIST,
      default: commonUserValidator.THEME_LIST[0],
    },
    boards: [{ type: Schema.Types.ObjectId, ref: 'board' }],
  },
  { versionKey: false, timestamps: true }
);

export default SchemaMongooseUser;
