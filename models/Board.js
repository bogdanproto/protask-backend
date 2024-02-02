import { Schema, model } from 'mongoose';

// import { addUpdateSettings, onSaveError } from './hooks.js';

// ============================================================

const boardSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: [true, 'Set title for board'],
    },

    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'user',
    //   required: true,
    // },
  },
  { versionKey: false }
);

// contactSchema.post('save', onSaveError);
// contactSchema.pre('findOneAndUpdate', addUpdateSettings);
// contactSchema.post('findOneAndUpdate', onSaveError);

const Board = model('board', boardSchema);

export default Board;
