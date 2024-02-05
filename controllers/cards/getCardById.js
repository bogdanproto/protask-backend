import { Card } from '../../models/index.js';
import { errorStatus, successStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const getCardById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: _id } = req.params;
  const result = await Card.findOne({ _id, owner }, '-createdAt -updatedAt')
    .populate('column', 'title')
    .populate('owner', 'userName');

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_CARD);
  }

  res.json({ ...successStatus.GET, data: result });
};
