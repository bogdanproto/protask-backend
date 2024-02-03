import express from 'express';

import { boardsPath, errorStatus } from '../../const/index.js';

import boardsController from '../../controllers/boards/index.js';

import {
  isEmptyBody,
  validateBody,
  isValidId,
} from '../../middlewares/index.js';

import {
  boardAddSchema,
  boardUpdateSchema,
  boardUpdateBackgroundSchema,
} from '../../schemas/boards/joiBoardSchema.js';

// ============================================================

const boardsRouter = express.Router();

boardsRouter.get(boardsPath.BASE, boardsController.getAllBoards);

boardsRouter.get(boardsPath.ID, isValidId, boardsController.getBoardById);

boardsRouter.post(
  boardsPath.BASE,
  isEmptyBody,
  validateBody(boardAddSchema, errorStatus.BAD_PARAMS_BOARD),
  boardsController.addBoard
);

boardsRouter.put(
  boardsPath.ID,
  isValidId,
  isEmptyBody,
  validateBody(boardUpdateSchema, errorStatus.BAD_PARAMS_BOARD),
  boardsController.updateBoard
);

boardsRouter.patch(
  boardsPath.BACKGROUND,
  isValidId,
  isEmptyBody,
  validateBody(boardUpdateBackgroundSchema, errorStatus.BAD_PARAMS_BOARD),
  boardsController.updateBoard
);

boardsRouter.delete(boardsPath.ID, isValidId, boardsController.deleteBoard);

export default boardsRouter;
