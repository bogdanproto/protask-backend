import express from 'express';

import { columnsPath } from '../../const/index.js';
import {
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody,
} from '../../middlewares/index.js';
import {
  columnAddSchema,
  columnUpdateSchema,
} from '../../schemas/Column/schemaJoiColumn.js';

import columnsController from '../../controllers/columns/index.js';

// ============================================================

const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.get(columnsPath.BASE, columnsController.getAllColumns);

columnsRouter.get(columnsPath.ID, isValidId, columnsController.getColumnById);

columnsRouter.post(
  columnsPath.BASE,
  isEmptyBody,
  validateBody(columnAddSchema),
  columnsController.addColumn
);

columnsRouter.put(
  columnsPath.ID,
  isValidId,
  isEmptyBody,
  validateBody(columnUpdateSchema),
  columnsController.updateColumn
);

columnsRouter.delete(columnsPath.ID, isValidId, columnsController.deleteColumn);

export default columnsRouter;
