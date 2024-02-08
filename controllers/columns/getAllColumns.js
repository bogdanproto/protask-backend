import { Board, Column } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const board = await Board.findOne({ _id: boardId, owner });

  if (!board) {
    throw HttpError({ ...errorStatus.NOT_FOUND_BOARD });
  }

  const result = await Column.find(
    { board: boardId, owner },
    '-createdAt -updatedAt -board -owner',
    {
      skip,
      limit,
    }
  );

  res.json({ ...successStatus.GET, data: [...result] });
};
