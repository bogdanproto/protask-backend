import { model } from 'mongoose';

import { handleSaveError, addUpdateSettings } from './hooks.js';

import columnSchema from '../schemas/Column/schemaMongooseColumn.js';

// ============================================================

columnSchema.post('save', handleSaveError);
columnSchema.pre('findOneAndUpdate', addUpdateSettings);
columnSchema.post('findOneAndUpdate', handleSaveError);

const Column = model('column', columnSchema);

export default Column;
