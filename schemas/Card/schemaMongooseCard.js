import { Schema } from 'mongoose';

// ============================================================

const priorityList = ['without priority', 'low', 'medium', 'high'];

const cardSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 60,
      required: [true, 'Set title for task'],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: priorityList,
      default: 'without priority',
    },
    deadline: {
      type: Date,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: 'column',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default cardSchema;
