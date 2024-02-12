import { model } from 'mongoose';

import { handleSaveError, addUpdateSettings } from './hooks.js';

import needHelpMongooseSchema from '../schemas/Column/schemaMongooseColumn.js';

// ============================================================

needHelpMongooseSchema.post('save', handleSaveError);
needHelpMongooseSchema.pre('findOneAndUpdate', addUpdateSettings);
needHelpMongooseSchema.post('findOneAndUpdate', handleSaveError);

const Help = model('column', needHelpMongooseSchema);

export default Help;
