import { model } from 'mongoose';
import { SchemaMongooseWallpaper } from '../schema/Wallpaper/index.js';

const Wallpaper = model('wallpaper', SchemaMongooseWallpaper);

export default Wallpaper;
