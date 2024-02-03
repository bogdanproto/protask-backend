import { ctrlWrapper } from '../../decorators/index.js';
import getAllWallpapers from './getAllWallpapers.js';

export default {
  getAllWallpapers: ctrlWrapper(getAllWallpapers),
};
