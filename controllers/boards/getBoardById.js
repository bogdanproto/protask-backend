import Board from '../../models/Board.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const getBoardById = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findOne({ _id: id }, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_BOARD);
  }

  res.json({ ...successStatus.GET, data: result });
};
