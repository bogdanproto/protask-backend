import express from 'express';

import { boardsPath, errorStatus } from '../../const/index.js';

import boardsController from '../../controllers/boards/index.js';

import { isEmptyBody } from '../../middlewares/index.js';

import { validateBody } from '../../decorators/index.js';

import {
  boardAddSchema,
  boardUpdateSchema,
} from '../../schemas/board-schema.js';

// ============================================================

const boardsRouter = express.Router();

boardsRouter.get(boardsPath.BASE, boardsController.getAllBoards);

boardsRouter.get(boardsPath.ID, boardsController.getBoardById);

boardsRouter.post(
  boardsPath.BASE,
  isEmptyBody,
  validateBody(boardAddSchema, errorStatus.BAD_PARAMS_BOARD),
  boardsController.addBoard
);

boardsRouter.put(
  boardsPath.ID,
  isEmptyBody,
  validateBody(boardUpdateSchema, errorStatus.BAD_PARAMS_BOARD),
  boardsController.updateBoard
);

boardsRouter.delete(boardsPath.ID, boardsController.deleteBoard);

export default boardsRouter;
