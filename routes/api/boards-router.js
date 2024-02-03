import express from 'express';

import boardsController from '../../controllers/boards/index.js';

import { boardsPath } from '../../const/index.js';
import {
  isEmptyBody,
  validateBody,
  isValidId,
  authenticate,
} from '../../middlewares/index.js';
import {
  boardAddSchema,
  boardUpdateSchema,
  boardUpdateBackgroundSchema,
} from '../../schemas/boards/joiBoardSchema.js';

// ============================================================

const boardsRouter = express.Router();

boardsRouter.use(authenticate);

boardsRouter.get(boardsPath.BASE, boardsController.getAllBoards);

boardsRouter.get(boardsPath.ID, isValidId, boardsController.getBoardById);

boardsRouter.post(
  boardsPath.BASE,
  isEmptyBody,
  validateBody(boardAddSchema),
  boardsController.addBoard
);

boardsRouter.put(
  boardsPath.ID,
  isValidId,
  isEmptyBody,
  validateBody(boardUpdateSchema),
  boardsController.updateBoard
);

boardsRouter.patch(
  boardsPath.BACKGROUND,
  isValidId,
  isEmptyBody,
  validateBody(boardUpdateBackgroundSchema),
  boardsController.updateBoard
);

boardsRouter.delete(boardsPath.ID, isValidId, boardsController.deleteBoard);

export default boardsRouter;
