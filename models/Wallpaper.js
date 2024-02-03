import { model } from 'mongoose';

import { handleSaveError, addUpdateSettings } from './hooks.js';

import { SchemaMongooseWallpaper } from '../schemas/Wallpaper/index.js';

SchemaMongooseWallpaper.post('save', handleSaveError);
SchemaMongooseWallpaper.pre('findOneAndUpdate', addUpdateSettings);
SchemaMongooseWallpaper.post('findOneAndUpdate', handleSaveError);

const Wallpaper = model('wallpaper', SchemaMongooseWallpaper);

export default Wallpaper;
