import express from 'express';
import { authenticate, validateBody } from '../../middlewares/index.js';
import { needHelpPath } from '../../const/index.js';
import { needHelpSchema } from '../../schemas/NeedHelp/needHelpSchema.js';

import needHelp from '../../controllers/need-help/needHelp.js';

const helpRouter = express.Router();

helpRouter.post(
  needHelpPath.BASE,
  authenticate,
  validateBody(needHelpSchema),
  needHelp
);

export default helpRouter;