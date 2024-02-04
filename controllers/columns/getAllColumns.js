import { Column } from '../../models/index.js';
import { successStatus } from '../../const/index.js';

// ============================================================

export const getAllColumns = async (req, res) => {
  const { board } = req.body;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Column.find({ board }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('board', 'title');

  res.json({ ...successStatus.GET, data: [...result] });
};
