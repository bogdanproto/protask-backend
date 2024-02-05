import { Column, Card } from '../../models/index.js';
import { errorStatus, successStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const deleteColumn = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  await Card.deleteMany({ column: _id, owner });
  const result = await Column.findOneAndDelete({ _id, owner });

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_COLUMN);
  }

  res.json({ ...successStatus.DELETED_COLUMN, data: { title: result.title } });
};
