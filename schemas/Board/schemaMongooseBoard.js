import { Schema } from 'mongoose';

// ============================================================

const boardSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: [true, 'Set title for board'],
    },
    icon: {
      type: String,
      required: [true, 'Set icon for board'],
    },
    backgroundImg: {
      // type: Schema.Types.ObjectId,
      // ref: 'wallpaper',
      type: String,
      default: '',
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
