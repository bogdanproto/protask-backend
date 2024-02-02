import * as boardsService from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const result = await boardsService.getBoardById(boardId);
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_BOARD);
  }

  res.json({ ...successStatus.GET, data: result });
};
