import { Column } from '../../models/index.js';
import { errorStatus, successStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const updateColumn = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Column.findOneAndUpdate({ _id, owner }, req.body);
  const { title, cards } = result;

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_COLUMN);
  }

  res.json({
    ...successStatus.UPDATED_COLUMN,
    data: { _id, title, cards },
  });
};
