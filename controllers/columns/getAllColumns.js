import { Column } from '../../models/index.js';
import { successStatus } from '../../const/index.js';

// ============================================================

export const getAllColumns = async (req, res) => {
  const { boardId } = req.body;
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Column.find(
    { board: boardId, owner },
    '-createdAt -updatedAt',
    {
      skip,
      limit,
    }
  )
    .populate('board', 'title')
    .populate('owner', 'userName');

  res.json({ ...successStatus.GET, data: [...result] });
};
