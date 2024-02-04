import { Schema } from 'mongoose';

// ============================================================

const columnSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 60,
      required: [true, 'Set title for column'],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'board',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default columnSchema;
