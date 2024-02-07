import { Card } from '../../models/index.js';
import { successStatus } from '../../const/index.js';

// ============================================================

export const getAllCards = async (req, res) => {
  const { columnId } = req.body;
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Card.find(
    { column: columnId, owner },
    '-createdAt -updatedAt -board -owner',
    {
      skip,
      limit,
    }
  );

  res.json({ ...successStatus.GET, data: [...result] });
};
