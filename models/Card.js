import { model } from 'mongoose';

import { handleSaveError, addUpdateSettings } from './hooks.js';

import cardSchema from '../schemas/Card/schemaMongooseCard.js';

// ============================================================

cardSchema.post('save', handleSaveError);
cardSchema.pre('findOneAndUpdate', addUpdateSettings);
cardSchema.pre('findByIdAndUpdate', addUpdateSettings);
cardSchema.post('findOneAndUpdate', handleSaveError);
cardSchema.post('findByIdAndUpdate', handleSaveError);

const Card = model('card', cardSchema);

export default Card;
