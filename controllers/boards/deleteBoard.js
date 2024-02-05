import { Board, Column } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const deleteBoard = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Board.findOneAndDelete({ _id, owner });

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_BOARD);
  }

  await Column.deleteMany({ board: _id, owner });

  res.json({ ...successStatus.DELETED_BOARD, data: result });
};
