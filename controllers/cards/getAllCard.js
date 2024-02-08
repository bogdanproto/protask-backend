import { Column, Card } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const getAllCards = async (req, res) => {
  const { _id: owner } = req.user;
  const { columnId, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const column = await Column.findOne({ _id: columnId, owner });

  if (!column) {
    throw HttpError({ ...errorStatus.NOT_FOUND_COLUMN });
  }

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
