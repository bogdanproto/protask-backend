import path from 'path';
import Jimp from 'jimp';
import fs from 'fs/promises';

const handleAvatarFile = async (objId, file) => {
  const { path: tempPath, destination, originalname } = file;

  const id = objId.toString();

  const arr = [...originalname];
  const idxExtension = arr.lastIndexOf('.');
  const extensionFile = arr.splice(idxExtension, arr.length - 1).join('');

  const fileName = `${id}${extensionFile}`;

  const avatarPath = path.join(destination, fileName);

  const imgOptimized = await Jimp.read(tempPath);
  await imgOptimized.resize(250, Jimp.AUTO).quality(60).writeAsync(tempPath);

  await fs.rename(tempPath, avatarPath);

  return avatarPath;
};

export default handleAvatarFile;
