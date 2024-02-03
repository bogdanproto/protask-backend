import { model } from 'mongoose';

import { handleSaveError, addUpdateSettings } from './hooks.js';

import boardSchema from '../schemas/Board/schemaMongooseBoard.js';

// ============================================================

boardSchema.post('save', handleSaveError);
boardSchema.pre('findOneAndUpdate', addUpdateSettings);
boardSchema.post('findOneAndUpdate', handleSaveError);

const Board = model('board', boardSchema);

export default Board;
