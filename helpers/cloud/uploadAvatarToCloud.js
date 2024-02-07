import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
});

const uploadAvatarToCloud = async imagePath => {
  const options = {
    use_filename: true,
    unique_filename: false,
    folder: 'avatars',
    overwrite: true,
  };

  const { url } = await cloudinary.uploader.upload(imagePath, options);

  return url;
};

export default uploadAvatarToCloud;
