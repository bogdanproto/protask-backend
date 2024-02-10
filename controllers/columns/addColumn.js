import { Board, Column } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const addColumn = async (req, res) => {
  const { boardId } = req.body;
  const { _id: owner } = req.user;

  const board = await Board.findOne({ _id: boardId, owner });

  if (!board) {
    throw HttpError({ ...errorStatus.BAD_DATA_BOARDID });
  }

  const result = await Column.create({ ...req.body, board: boardId, owner });
  const { _id, title } = result;

  if (!result) {
    throw HttpError({ ...errorStatus.BAD_DATA });
  }

  await board.updateOne({ $push: { columns: result._id } });

  res.status(successStatus.CREATED_COLUMN.status).json({ ...successStatus.CREATED_COLUMN, data: { _id, title } });
};
