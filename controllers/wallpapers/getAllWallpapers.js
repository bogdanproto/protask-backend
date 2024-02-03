import { successStatus } from '../../const/index.js';
import { Wallpaper } from '../../models/index.js';

const getAllWallpapers = async (_, res) => {
  const data = await Wallpaper.find().select('-__v -createdAt -updatedAt');

  res.json({ ...successStatus.GET, data });
};

export default getAllWallpapers;
