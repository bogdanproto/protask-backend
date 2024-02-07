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
      default: backgroundsList[0],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    columns: [{ type: Schema.Types.ObjectId, ref: 'column' }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default boardSchema;
