import { Card } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const deleteCard = async (req, res) => {
  const { id: _id } = req.params;
  const result = await Card.findByIdAndDelete(_id);
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_CARD);
  }
  res.json({ ...successStatus.DELETED_CARD, data: { title: result.title } });
};
