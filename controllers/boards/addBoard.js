import * as boardsService from '../../models/index.js';

import { successStatus } from '../../const/index.js';

// ============================================================

export const addBoard = async (req, res) => {
  const result = await boardsService.addBoard(req.body);

  res.json({ ...successStatus.CREATED_BOARD, data: result });
};
