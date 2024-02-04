import { Card } from '../../models/index.js';
import { successStatus } from '../../const/index.js';

// ============================================================

export const getAllCards = async (req, res) => {
  console.log(req.body);
  const { columnId } = req.body;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Card.find({ columnId }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('columnId', 'title');
  res.json({ ...successStatus.GET, data: [...result] });
};
