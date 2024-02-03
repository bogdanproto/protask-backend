import Board from '../../models/Board.js';
import { successStatus } from '../../const/index.js';

// ============================================================

export const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });

  res.json({ ...successStatus.CREATED_BOARD, data: result });
};
