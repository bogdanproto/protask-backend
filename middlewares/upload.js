import multer from 'multer';
import path from 'path';

const pathTemp = path.join(process.cwd(), process.env.DIR_TEMP);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathTemp);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1500000 },
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      cb(null, false);
      cb(new multer.MulterError('File should be only image'));
      return;
    }
    cb(null, true);
  },
});

export default upload;
