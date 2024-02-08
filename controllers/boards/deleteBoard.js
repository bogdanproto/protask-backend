import { User, Board, Column, Card } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const deleteBoard = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const board = await Board.findOne({ _id, owner });

  if (!board) {
    throw HttpError(errorStatus.NOT_FOUND_BOARD);
  }

  const user = await User.findOne({ _id: owner });
  const { title } = board;

  await board.deleteOne();
  await user.updateOne({ $pull: { boards: board._id } });
  await Column.deleteMany({ board: _id, owner });
  await Card.deleteMany({ board: _id, owner });

  res.json({ ...successStatus.DELETED_BOARD, data: { _id, title } });
};
