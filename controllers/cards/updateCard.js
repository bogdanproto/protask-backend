import { Card } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const updateCard = async (req, res) => {
  const { id: _id } = req.params;
  const result = await Card.findByIdAndUpdate(_id, req.body).populate(
    'columnId',
    'title'
  );
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_CARD);
  }
  res.json({ ...successStatus.UPDATED_CARD, data: result });
};
