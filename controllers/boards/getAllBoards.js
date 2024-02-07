import { Board } from '../../models/index.js';
import { successStatus } from '../../const/index.js';

// ============================================================

export const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Board.find(
    { owner },
    '-createdAt -updatedAt -owner -columns',
    {
      skip,
      limit,
    }
  );

  res.json({ ...successStatus.GET, data: [...result] });
};
