import { Column, Card } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const getAllCards = async (req, res) => {
  const { columnId } = req.body;
  const column = await Column.findById(columnId);

  if (!column) {
    throw HttpError({ ...errorStatus.BAD_PARAMS });
  }

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Card.find({ columnId }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('columnId', 'title');
  res.json({ ...successStatus.GET, data: [...result] });
};
