import { Board, Column } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const addColumn = async (req, res) => {
  const { board: boardId } = req.body;
  const board = await Board.findById(boardId);

  if (!board) {
    throw HttpError({ ...errorStatus.BAD_PARAMS_COLUMN });
  }

  const result = await Column.create(req.body);

  res.json({ ...successStatus.CREATED_COLUMN, data: result });
};
