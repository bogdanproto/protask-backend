import Board from '../../models/Board.js';

import { successStatus } from '../../const/index.js';

// ============================================================

export const addBoard = async (req, res) => {
  const result = await Board.create(req.body);

  res.json({ ...successStatus.CREATED_BOARD, data: result });
};
