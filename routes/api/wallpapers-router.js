import express from 'express';
import { authenticate } from '../../middlewares/index.js';
import { wallpaperPath } from '../../const/index.js';

import wallpaperCtrl from '../../controllers/wallpapers/index.js';

const wallpaperRouter = express.Router();

wallpaperRouter.use(authenticate);

wallpaperRouter.get(wallpaperPath.BASE, wallpaperCtrl.getAllWallpapers);

export default wallpaperRouter;
