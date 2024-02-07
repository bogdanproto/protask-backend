import fs from 'fs/promises';

const deleteFile = async path => {
  await fs.unlink(path);
};

export default deleteFile;
