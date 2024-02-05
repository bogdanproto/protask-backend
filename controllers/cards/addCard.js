import { Card } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const addCard = async (req, res) => {
  const { columnId } = req.body;
  const { _id: owner } = req.user;

  const result = await Card.create({ ...req.body, column: columnId, owner });

  if (!result) {
    throw HttpError({ ...errorStatus.BAD_PARAMS });
  }

  res.json({ ...successStatus.CREATED_CARD, data: result });
};
