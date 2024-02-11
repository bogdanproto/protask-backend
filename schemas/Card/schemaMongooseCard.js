import { Schema } from 'mongoose';

import { priorityList } from '../../const/index.js';

// ============================================================

const cardSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 60,
      required: [true, 'Required field "title" cannot be empty'],
    },
    description: {
      type: String,
      default: '',
    },
    priority: {
      type: String,
      enum: priorityList,
      default: 'without',
    },
    deadline: {
      type: String,
      default: '--/--/----',
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: 'column',
      required: [true, 'Required field "columnId" cannot be empty'],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'board',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Required field "owner" cannot be empty'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default cardSchema;
