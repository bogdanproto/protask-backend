import { Column, Card } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const addCard = async (req, res) => {
  const { columnId } = req.body;
  const column = await Column.findById(columnId);

  if (!column) {
    throw HttpError({ ...errorStatus.BAD_PARAMS_CARD });
  }

  const result = await Card.create(req.body);

  res.json({ ...successStatus.CREATED_CARD, data: result });
};
