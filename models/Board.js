import { model } from 'mongoose';

import boardSchema from '../schemas/boards/mongooseBoardSchema.js';

import { handleSaveError, addUpdateSettings } from './hooks.js';

// ============================================================

boardSchema.post('save', handleSaveError);
boardSchema.pre('findOneAndUpdate', addUpdateSettings);
boardSchema.post('findOneAndUpdate', handleSaveError);

const Board = model('board', boardSchema);

export default Board;
