import express from 'express';

import { boardsPath } from '../../const/index.js';
import {
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody,
} from '../../middlewares/index.js';
import {
  boardAddSchema,
  boardUpdateSchema,
} from '../../schemas/Board/schemaJoiBoard.js';

import boardsController from '../../controllers/boards/index.js';

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

boardsRouter.delete(boardsPath.ID, isValidId, boardsController.deleteBoard);

export default boardsRouter;
