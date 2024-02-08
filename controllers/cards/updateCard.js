import { Card } from '../../models/index.js';
import { errorStatus, successStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const updateCard = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await Card.findOneAndUpdate({ _id, owner }, req.body);

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_CARD);
  }

  const { title, description, priority, deadline, column } = result;

  res.json({
    ...successStatus.UPDATED_CARD,
    data: { _id, title, description, priority, deadline, column },
  });
};
