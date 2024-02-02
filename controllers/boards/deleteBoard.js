import * as boardsService from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const result = await boardsService.deleteBoard(boardId);
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_BOARD);
  }

  res.json({ ...successStatus.DELETED_BOARD, data: result });
};
