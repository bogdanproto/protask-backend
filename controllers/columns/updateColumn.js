import { Column } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const updateColumn = async (req, res) => {
  const { id: _id } = req.params;
  const result = await Column.findByIdAndUpdate(_id, req.body);
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_COLUMN);
  }

  res.json({ ...successStatus.UPDATED_COLUMN, data: result });
};
