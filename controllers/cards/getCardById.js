import { Card } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const getCardById = async (req, res) => {
  const { id: _id } = req.params;
  const result = await Card.findById(_id, '-createdAt -updatedAt').populate(
    'columnId',
    'title'
  );
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_CARD);
  }
  res.json({ ...successStatus.GET, data: result });
};
