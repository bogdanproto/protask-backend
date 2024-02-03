import { Schema } from 'mongoose';

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
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default boardSchema;
