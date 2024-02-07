import { Board, Column, Card } from '../../models/index.js';
import { errorStatus, successStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const deleteColumn = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const column = await Column.findOne({ _id, owner });
  const board = await Board.findOne({ _id: column.board, owner });
  const result = await column.deleteOne();

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_COLUMN);
  }

  await board.updateOne({ $pull: { columns: column._id } });
  await Card.deleteMany({ column: _id, owner });

  res.json({ ...successStatus.DELETED_COLUMN, data: { title: column.title } });
};
