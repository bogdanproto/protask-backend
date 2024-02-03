import Board from '../../models/Board.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const updateBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_BOARD);
  }
  res.json({ ...successStatus.UPDATED_BOARD, data: result });
};
