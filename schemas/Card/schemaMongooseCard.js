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
      default: 'without priority',
    },
    deadline: {
      type: Date,
      default: null,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: 'column',
      required: [true, 'Required field "columnId" cannot be empty'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default cardSchema;
