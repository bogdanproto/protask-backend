import { Schema } from 'mongoose';

// ============================================================

const columnSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 60,
      required: [true, 'Required field "title" cannot be empty'],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'board',
      required: [true, 'Required field "boardId" cannot be empty'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    cards: [{ type: Schema.Types.ObjectId, ref: 'card' }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default columnSchema;
