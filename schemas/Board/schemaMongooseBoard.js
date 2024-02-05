import { Schema } from 'mongoose';

import { iconsList, backgroundsList } from '../../const/index.js';

// ============================================================

const boardSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 60,
      required: [true, 'Required field "title" cannot be empty'],
    },
    icon: {
      type: String,
      enum: iconsList,
      default: 'project',
    },
    backgroundImg: {
      type: Schema.Types.ObjectId,
      ref: 'wallpaper',
      enum: backgroundsList,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default boardSchema;
