import { Column } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const getColumnById = async (req, res) => {
  const { id: _id } = req.params;
  const result = await Column.findById(_id, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_COLUMN);
  }

  res.json({ ...successStatus.GET, data: result });
};
